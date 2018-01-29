
export const wavyBaseline = (_this) => {
  // console.log(fontAn);

  
  _this.paperScope.activate();

  _.each(_this.glyphs, (glyph, i) => {
    glyph.fillColor = "blue";
  });


  _this.paperScope.view.draw();


};