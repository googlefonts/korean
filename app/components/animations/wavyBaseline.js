export const wavyBaseline = {
  attach: (_this) => {
    // console.log(fontAn);

    
    _this.project.activate();

    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = "blue";
    });


    _this.view.draw();


  },

  detach: (_this) => {
    
    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = "black";
    });
  },

  updatePosition: (_this, x, y, fontScale, font) => {

  }
};
