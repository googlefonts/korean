import paper from 'paper';
export const bezierShowScript = {
  attach: (_this) => {

    _this.bezierShowScript = {
    };
    

    _this.project.activate();

    _this.bezierShowScript.bezierGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      // glyph.strokeWidth = 0;
      var _g = glyph.clone();
      _this.bezierShowScript.bezierGlyphs.push(_g);

      glyph.visible = false;
      _g.fillColor = "white";
      _g.fullySelected = true;

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
