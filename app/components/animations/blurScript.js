import paper from 'paper';
import { convertBgMode } from '../../utils';

export const blurScript = {
  attach: (_this, backgroundMode) => {

    _this.blurScript = {
    };
    
    _this.project.activate();

    _this.blurScript.blurGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      // glyph.strokeWidth = 0;
      
      var _g = glyph.clone();
      _this.blurScript.blurGlyphs.push(_g);

      glyph.visible = false;
      _g.fillColor = convertBgMode(backgroundMode, "f");

    });

    _this.refCanvas.style.transition = "1s filter";
    _this.refCanvas.style.filter = "blur(6px)";

    _this.view.draw();

  }, 


  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.blurScript.blurGlyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
    });

    _this.view.draw();

  },


  detach: (_this) => {
    _this.project.activate();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.visible = true;
    });

    _.each(_this.blurScript.blurGlyphs, g => {
      g.remove();
    });

    _this.refCanvas.style.filter = "blur(0)";

    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
   

  }
};
