import paper from 'paper';

export const bezierBubble = (_this) => {
  // console.log(fontAn);


  _this.paperScope.activate();

  var circle = new paper.Path.Circle({center: [400, 200], radius: 200, fillColor: "green"});


  _.each(_this.glyphs, (glyph, i) => {
    glyph.fillColor = "red";
  });

  var group = new paper.Group([circle].concat(_this.glyphs));
  group.clipped = true;

  _this.paperScope.view.draw();


};