import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear } from 'd3';
import { BODY_480 } from '../../constants/defaults';

export const magnifyScript = {
  attach: (_this, backgroundMode) => {

    var sizeScale;

    if (_this.props.screenWidth <= BODY_480) {
      sizeScale = scaleLinear().domain([0, 300]).clamp(true).range([140, 0]);
    } else {
      sizeScale = scaleLinear().domain([0, 170]).clamp(true).range([150, 0]);

    }
    
    _this.magnifyScript = {
      point: new paper.Point(300, 200),
      tPoint: new paper.Point(300, 200),
      size: 100,
      tSize: 100
    };

    _this.project.activate();

    _this.magnifyScript.maskedGlyphs = new paper.Group();

    _.each(_this.glyphs, (glyph, i) => {
      glyph.strokeWidth = 0;
      var _g = glyph.clone();

      _this.magnifyScript.maskedGlyphs.addChild(_g);
    });

    _this.magnifyScript.maskRect = new paper.Path.Rectangle({
      point: [_this.magnifyScript.maskedGlyphs.bounds.left - 200, _this.magnifyScript.maskedGlyphs.bounds.top - 200],
      size: [_this.magnifyScript.maskedGlyphs.bounds.size.width + 400, _this.magnifyScript.maskedGlyphs.bounds.size.height + 400],
      fillColor: convertBgMode(backgroundMode, "b")
    });

    _this.magnifyScript.maskCircle = new paper.Path.Circle({center: [400, 200], radius: 100, fillColor: "green"});

    _this.magnifyScript.circle = new paper.Path.Circle({center: [400, 200], radius: 100, strokeColor: convertBgMode(backgroundMode, "f")});



    _this.magnifyScript.scaleGroup = new paper.Group([_this.magnifyScript.maskRect, _this.magnifyScript.maskedGlyphs]);

    if (_this.props.screenWidth <= BODY_480) {
      _this.magnifyScript.scaleGroup.scale(1.4);
    } else {
      _this.magnifyScript.scaleGroup.scale(1.8);

    }

    _this.magnifyScript.group = new paper.Group([_this.magnifyScript.maskCircle, _this.magnifyScript.scaleGroup]);

    _this.magnifyScript.group.clipped = true;
    
    _this.magnifyScript.maskRect.fillColor = convertBgMode(backgroundMode, "b");
    _this.magnifyScript.circle.strokeColor = convertBgMode(backgroundMode, "f");
    _this.magnifyScript.circle.strokeWidth = 2; //stroke width
    
    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
      glyph.strokeColor = convertBgMode(backgroundMode, "f");
    });

    _.each(_this.magnifyScript.maskedGlyphs.children, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");  
      glyph.strokeColor = convertBgMode(backgroundMode, "f");
    });



    _this.view.draw();

    _this.view.onMouseMove = (e) => {
      _this.magnifyScript.tPoint = e.point;
      let dist = Math.abs(_this.magnifyScript.tPoint.y - _this.magnifyScript.maskedGlyphs.bounds.center.y);
    
      _this.magnifyScript.tSize = sizeScale(dist);

    }


    _this.view.onFrame = (e) => {
       _this.magnifyScript.size += (_this.magnifyScript.tSize - _this.magnifyScript.size) * 0.2;

      _this.magnifyScript.point = _this.magnifyScript.point.add(_this.magnifyScript.tPoint.subtract(_this.magnifyScript.point).multiply(0.2));

      let radius = _this.magnifyScript.maskCircle.bounds.width / 2;
      
      _this.project.activate();


      _this.magnifyScript.maskCircle.position = _this.magnifyScript.point;
      _this.magnifyScript.circle.position = _this.magnifyScript.point;

      _this.magnifyScript.maskCircle.scale(_this.magnifyScript.size / radius);
      _this.magnifyScript.circle.scale(_this.magnifyScript.size / radius);

      _this.view.draw();
    };

  }, 


  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _this.magnifyScript.maskRect.fillColor = convertBgMode(backgroundMode, "b");
    _this.magnifyScript.circle.strokeColor = convertBgMode(backgroundMode, "f");
    
    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
      glyph.strokeColor = convertBgMode(backgroundMode, "f");
    });

    _.each(_this.magnifyScript.maskedGlyphs.children, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");  
      glyph.strokeColor = convertBgMode(backgroundMode, "f");
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

    _this.magnifyScript.maskedGlyphs.remove();

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
