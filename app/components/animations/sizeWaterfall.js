import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear } from 'd3';

const GROUP_COUNT = 20;

const vectorScale = scaleLinear().domain([0, GROUP_COUNT]).clamp(true).range([0.0, 1.0]);

export const sizeWaterfall = {
  attach: (_this, backgroundMode) => {

    _this.sizeWaterfall = {
      point: new paper.Point(400, 200)
    };

    _this.project.activate();

    _this.sizeWaterfall.glyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      var _g = glyph.clone();
      _this.sizeWaterfall.glyphs.push(_g);
      glyph.visible = false;
    });

    _this.sizeWaterfall.originalGlyphGroup = new paper.Group(_this.sizeWaterfall.glyphs);

    _this.sizeWaterfall.originalGlyphGroup.fillColor = "black";//convertBgMode(backgroundMode, "b");
    _this.sizeWaterfall.originalGlyphGroup.strokeColor = "white";//convertBgMode(backgroundMode, "f");

    _this.sizeWaterfall.glyphGroups = [];

    var s = scaleLinear().domain([0, GROUP_COUNT]).clamp(true).range([1.0, 0.2]);

    for (let i = 0; i < GROUP_COUNT; i++) {

      let glyphGroup = _this.sizeWaterfall.originalGlyphGroup.clone();

      // glyphGroup.position = new paper.Point(Math.random() * 400, Math.random() * 500);
      glyphGroup.scale(s(i));
      glyphGroup.fillColor = "black";//convertBgMode(backgroundMode, "b");
      glyphGroup.strokeColor = "white";//convertBgMode(backgroundMode, "f");

      _this.sizeWaterfall.glyphGroups.push(glyphGroup);
    }


    _this.view.onMouseMove = (e) => {

      _this.sizeWaterfall.point = e.point.clone();
      // _this.sizeWaterfall.point.x -= 650;
      // _this.sizeWaterfall.point.y -= 350;
    }


    
    _this.view.onFrame = (e) => {
      var path = new paper.Path();
      var center = _this.sizeWaterfall.originalGlyphGroup.bounds.center;
      path.visible = false;
      path.add(center);
      // console.log(_this.sizeWaterfall.originalGlyphGroup.bounds.center);
      // debugger;
      // var point = _this.sizeWaterfall.point
        
      
      if (_this.sizeWaterfall.point.x > center.x) {
        // 아래쪽 으로 U자로 휘어야함 
        var handleIn = new paper.Point(-150, 0);
        var handleOut = new paper.Point(0, 0);
        
      } else {
        // var handleIn = new paper.Point(50, 0);
        var handleIn = new paper.Point(150, 0);
        var handleOut = new paper.Point(0, 0);
        
        // 위쪽으로 휘어야함
      }

      
      path.add(new paper.Segment(_this.sizeWaterfall.point, handleIn, handleOut));
      path.strokeColor = "red";

      var vector = _this.sizeWaterfall.point.subtract(center);

      _.each(_this.sizeWaterfall.glyphGroups, (g, i) => {

        g.position = path.curves[0].getPointAtTime(vectorScale(i));//center.add(vector.multiply(vectorScale(i)))

      });

      path.remove();


    };

  }, 

  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _this.sizeWaterfall.originalGlyphGroup.fillColor = "black";//convertBgMode(backgroundMode, "b");
    _this.sizeWaterfall.originalGlyphGroup.strokeColor = "white";//convertBgMode(backgroundMode, "f");
    
    _.each(_this.sizeWaterfall.glyphGroups, g => {
      
      g.fillColor = "black";//convertBgMode(backgroundMode, "b");
      g.strokeColor = "white";//convertBgMode(backgroundMode, "f");

    });


    _this.view.draw();

  },

  detach: (_this) => {
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => { 
      glyph.visible = true;
    });

    _.each(_this.sizeWaterfall.glyphGroups, g => {
      g.remove();
    });

    _this.sizeWaterfall.originalGlyphGroup.remove();

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
    var kerningValue = 0;

    // _.each(_this.sizeWaterfall.leftGlyphs, (glyph, i) => {
    //   glyph.position = new paper.Point(x, y);

    //   if (_this.glyphs[i].fontGlyph.advanceWidth) {
    //     x += _this.glyphs[i].fontGlyph.advanceWidth * fontScale;
    //   }
    //   if (i < _this.glyphs.length - 1) {
    //     kerningValue = font.getKerningValue(_this.glyphs[i].fontGlyph, _this.glyphs[i + 1].fontGlyph);
    //     x += kerningValue * fontScale;
    //   }
    // });


  }
};



// var circlePath1 = new Path.Circle(new Point(350, 350), 125);
// var circlePath2 = new Path.Circle(new Point(550, 350), 125);
// var circlePath3 = new Path.Circle(new Point(750, 350), 125);
// circlePath1.strokeColor = 'black';
// circlePath2.strokeColor = 'black';
// circlePath3.strokeColor = 'black';

// var g = new Group([circlePath1, circlePath2, circlePath3]);
// var d = g.clone();
// d.shear(0.0, -0.5, new Point(550, 350));
// g.shear(0.0, 0.5, new Point(550, 350));
// // circlePath.