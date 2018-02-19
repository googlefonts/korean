import paper from 'paper';
import { convertBgMode } from '../../utils'; 
export const bezierBubble = {
  attach: (_this, backgroundMode) => {

    _this.bezierBubble = {
      point: new paper.Point(400, 200),
      rPoint: new paper.Point(400, 200),
      points: []
    };

    _this.project.activate();

    _this.bezierBubble.maskCircle = new paper.Path.Circle({center: [400, 200], radius: 150, fillColor: "green"});

    _this.bezierBubble.circle = new paper.Path.Circle({center: [400, 200], radius: 150, strokeColor: convertBgMode(backgroundMode, "f")});

    _this.bezierBubble.maskedGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {

      _.each(glyph.children, (child, j) => {
        _.each(child.segments, (seg, k) => {
          
          let p = new paper.Path.Rectangle(seg.point.subtract(new paper.Point(1.5, 1.5)), 3);

          p.fillColor = convertBgMode(backgroundMode, 'f');
          _this.bezierBubble.points.push(p);
        });
      });



      glyph.strokeWidth = 0;
      glyph.fillColor = convertBgMode(backgroundMode, "f");
      var _g = glyph.clone();
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.dashArray = [1, 3];
      _g.strokeWidth = 1;
      _this.bezierBubble.maskedGlyphs.push(_g);
    });


    _this.bezierBubble.group = new paper.Group([_this.bezierBubble.maskCircle].concat(_this.bezierBubble.maskedGlyphs).concat(_this.bezierBubble.points));
    _this.bezierBubble.group.clipped = true;
    _this.view.draw();

    // _this.view.onMouseEnter = (e) => {
    //   console.log("mouseenter");
    //   // debugger;
    //   _this.bezierBubble.point = e.point;
    // }

    _this.view.onMouseMove = (e) => {
      _this.bezierBubble.point = e.point;
    }


    // _this.view.emit('onMouseMove');

    _this.view.onFrame = (e) => {
      _this.project.activate();
      _this.bezierBubble.rPoint = _this.bezierBubble.rPoint.add(_this.bezierBubble.point.subtract(_this.bezierBubble.rPoint).multiply(0.2));

      _this.bezierBubble.maskCircle.position = _this.bezierBubble.rPoint;
      _this.bezierBubble.circle.position = _this.bezierBubble.rPoint;
      _this.view.draw();
    };

  }, 

  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.bezierBubble.maskedGlyphs, g => {
      g.strokeColor = convertBgMode(backgroundMode, "f");
      g.fillColor = convertBgMode(backgroundMode, "b");
    });


    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
    });

    _.each(_this.bezierBubble.points, p => {
      p.fillColor = convertBgMode(backgroundMode, "f");
    });

    _this.bezierBubble.circle.strokeColor = convertBgMode(backgroundMode, "f");

    _this.view.draw();

  },

  detach: (_this) => {
    _this.project.activate();

    _this.bezierBubble.circle.remove();
    _this.bezierBubble.maskCircle.remove();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.strokeWidth = 1;
    });


    _.each(_this.bezierBubble.points, p => {
      p.remove();
    });
    _.each(_this.bezierBubble.maskedGlyphs, g => {
      g.remove();
    });


    _this.bezierBubble.group.remove();

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.onMouseEnter = null;
    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
    var kerningValue = 0;

    _.each(_this.bezierBubble.maskedGlyphs, (glyph, i) => {
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
