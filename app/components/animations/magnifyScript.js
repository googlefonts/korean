import paper from 'paper';
import { convertBgMode } from '../../utils';

export const magnifyScript = {
  attach: (_this, backgroundMode) => {

    _this.magnifyScript = {
      point: new paper.Point(400, 200)
    };

    _this.project.activate();

    _this.magnifyScript.maskRect = new paper.Path.Rectangle({
      point: [0, 0],
      size: [400, 400],
      fillColor: convertBgMode(backgroundMode, "b")
    });

    _this.magnifyScript.maskCircle = new paper.Path.Circle({center: [400, 200], radius: 100, fillColor: "green"});

    _this.magnifyScript.circle = new paper.Path.Circle({center: [400, 200], radius: 100, strokeColor: convertBgMode(backgroundMode, "f")});

    _this.magnifyScript.maskedGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      glyph.strokeWidth = 0;
      var _g = glyph.clone();

      _this.magnifyScript.maskedGlyphs.push(_g);
    });

    _this.magnifyScript.scaleGroup = new paper.Group([_this.magnifyScript.maskRect].concat(_this.magnifyScript.maskedGlyphs));
    _this.magnifyScript.scaleGroup.scale(1.27);

    _this.magnifyScript.group = new paper.Group([_this.magnifyScript.maskCircle, _this.magnifyScript.scaleGroup]);

    _this.magnifyScript.group.clipped = true;
    _this.view.draw();

    _this.view.onMouseMove = (e) => {
      _this.magnifyScript.point = e.point;
    }


    _this.view.onFrame = (e) => {
      _this.project.activate();
      _this.magnifyScript.maskCircle.position = _this.magnifyScript.point;
      _this.magnifyScript.circle.position = _this.magnifyScript.point;
      _this.view.draw();
    };

  }, 


  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _this.magnifyScript.maskRect.fillColor = convertBgMode(backgroundMode, "b");
    _this.magnifyScript.circle.strokeColor = convertBgMode(backgroundMode, "f");
    
    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
    });

    _.each(_this.magnifyScript.maskedGlyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");  
    });


    _this.view.draw();

  },


  detach: (_this) => {
    _this.project.activate();

    _this.magnifyScript.circle.remove();
    _this.magnifyScript.maskCircle.remove();
    _this.magnifyScript.maskRect.remove();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.strokeWidth = 1;
    });

    _.each(_this.magnifyScript.maskedGlyphs, g => {
      g.remove();
    });
    _this.magnifyScript.group.remove();

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
    var kerningValue = 0;

    _.each(_this.magnifyScript.maskedGlyphs, (glyph, i) => {
      glyph.position = new paper.Point(x, y);

      if (_this.glyphs[i].fontGlyph.advanceWidth) {
        x += _this.glyphs[i].fontGlyph.advanceWidth * fontScale;
      }
      if (i < _this.glyphs.length - 1) {
        kerningValue = font.getKerningValue(_this.glyphs[i].fontGlyph, _this.glyphs[i + 1].fontGlyph);
        x += kerningValue * fontScale;
      }
    });

  }
};
