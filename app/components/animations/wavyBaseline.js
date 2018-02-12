import paper from 'paper';
import { convertBgMode } from '../../utils';

const interpolateCompoundPath = (path) => {
  
  var interpolatedPath = new paper.CompoundPath();
  
  for (var i = 0; i < path.children.length; i++) {
      var childIntPath = new paper.Path();
      var child = path.children[i];
      var amount = 100;
      var length = child.length;
      
      for (var j = 0; j < amount + 1; j++) {
          var offset = j / amount * length;
          var point = child.getPointAt(offset);
          // var circle = new Path.Circle({
          //     center: point,
          //     radius: 2,
          //     fillColor: 'red'
          // });
          childIntPath.add(point);
      }
      childIntPath.closed = true;
      interpolatedPath.addChild(childIntPath);
  }  
  interpolatedPath.fullySelected = true;
  return interpolatedPath;
};

export const wavyBaseline = {
  attach: (_this, backgroundMode) => {
    // console.log(fontAn);
    _this.wavyBaseline = {
      glyphs: []
    };

   
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => {

      // var _g = glyph.clone();
      var _g = interpolateCompoundPath(glyph);
      glyph.visible = false;
      
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      // g.fillColor = convertBgMode(backgroundMode, "b");

      _this.wavyBaseline.glyphs.push(_g);
    });

    // figure out width
    // _this.wavyBaseline.dx = (Math.PI / ) * 50;


    _this.view.onFrame = (e) => {

      var i = 0;
      _.each(_this.wavyBaseline.glyphs, g => {
        
        _.each(g.children, child => {

          _.each(child.segments, (seg, j) => {

            let p = seg.point.clone();



          });


        });
        
      });  


    }
    

    _this.view.draw();


  },
  
  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();


    _.each(_this.wavyBaseline.glyphs, g => {
      g.strokeColor = convertBgMode(backgroundMode, "f");
      g.fillColor = convertBgMode(backgroundMode, "b");
    });

    _this.view.draw();

  },


  detach: (_this) => {
    _.each(_this.wavyBaseline.glyphs, g => {
      g.remove();
    });

    _.each(_this.glyphs, (glyph, i) => {
      glyph.visible = true;
    });

    _this.view.onFrame = null;
  },

  updatePosition: (_this, x, y, fontScale, font) => {

  }
};

// var width, height, center;
// var points = 30;
// var smooth = false;
// var path = new Path();
// var theta = 0;
// var dx = 0;

  
// path.fillColor = 'black';
// initializePath();

// function initializePath() {
//   center = view.center;
//   width = view.size.width;
//   height = view.size.height / 2;
//   path.segments = [];
//   dx = (Math.PI * 2 / view.size.width) * 50;
//   path.add(view.bounds.bottomLeft);
//   for (var i = 1; i < points; i++) {
//     var point = new Point(width / points * i, center.y);
//     path.add(point);
//   }
//   path.add(view.bounds.bottomRight);
//   path.fullySelected = true;
// }

// function onFrame(event) {
//     theta += 0.02;

//   var x = theta;
//   for (var i = 1; i < points; i++) {
//     var yPos = Math.sin(x) * 50 + height;
//     path.segments[i].point.y = yPos;
//     x += dx;
//   }
//   if (smooth)
//     path.smooth({ type: 'continuous' });
// }

// // Reposition the path whenever the window is resized:
// function onResize(event) {
//   initializePath();
// }
