import paper from 'paper';
import { convertBgMode } from '../../utils';

export const bezierShowScript = {
  attach: (_this, backgroundMode) => {

    _this.bezierShowScript = {
    };
    
    _this.project.activate();

    _this.bezierShowScript.bezierGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      // glyph.strokeWidth = 0;
      
      var _g = glyph.clone();
      _this.bezierShowScript.bezierGlyphs.push(_g);

      glyph.visible = false;
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.fullySelected = true;

    });

    _this.view.draw();

  }, 


  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.bezierShowScript.bezierGlyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "b");
    });

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

    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
   

  }
};
