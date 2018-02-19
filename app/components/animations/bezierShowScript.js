import paper from 'paper';
import { convertBgMode } from '../../utils';

export const bezierShowScript = {
  attach: (_this, backgroundMode) => {

    _this.bezierShowScript = {
      points: []
    };
    
    _this.project.activate();

    _this.bezierShowScript.bezierGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      // glyph.strokeWidth = 0;
      

      _.each(glyph.children, (child, j) => {
        _.each(child.segments, (seg, k) => {
          
          let p = new paper.Path.Rectangle(seg.point.subtract(new paper.Point(1, 1)), 2);

          p.fillColor = convertBgMode(backgroundMode, 'f');
          _this.bezierShowScript.points.push(p);
        });
      });


      var _g = glyph.clone();
      _this.bezierShowScript.bezierGlyphs.push(_g);

      glyph.visible = false;
      _g.fillColor = convertBgMode(backgroundMode, "b");
      // _g.fullySelected = true;
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      _g.dashArray = [1, 2];
      _g.strokeWidth = 1;

    });

    _this.view.draw();

  }, 


  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.bezierShowScript.bezierGlyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "b");
      glyph.strokeColor = convertBgMode(backgroundMode, "f");
    });

    _.each(_this.bezierShowScript.points, p => {
      p.fillColor = convertBgMode(backgroundMode, "f");
    })

    _this.view.draw();

  },


  detach: (_this) => {
    _this.project.activate();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.visible = true;
    });

    _.each(_this.bezierShowScript.bezierGlyphs, g => {
      g.remove();
    });

    _.each(_this.bezierShowScript.points, p => {
      p.remove();
    })

    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
   

  }
};
