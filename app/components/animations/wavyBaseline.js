import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear } from 'd3';
import { BODY_480 } from '../../constants/defaults';

const amountScale = scaleLinear().domain([150, 2000]).clamp(true).range([50, 300]);

var yMax = Number.MIN_VALUE;
const interpolateCompoundPath = (path) => {
  // console.log(_this.xDist);
  var interpolatedPath = new paper.CompoundPath();
    
  for (var i = 0; i < path.children.length; i++) {
      var childIntPath = new paper.Path();
      var child = path.children[i];
      var amount = Math.floor(amountScale(child.length));
      var length = child.length;
      
      for (var j = 0; j < amount + 1; j++) {
          var offset = j / amount * length;
          var point = child.getPointAt(offset);
          
          if (yMax < point.y) {
            yMax = point.y;
          }

          childIntPath.add(point);
      }
      childIntPath.closed = true;
      interpolatedPath.addChild(childIntPath);
  }  
  // interpolatedPath.fullySelected = true;
  return interpolatedPath;
};

export const wavyBaseline = {
  attach: (_this, backgroundMode) => {
    // console.log(fontAn);
    _this.wavyBaseline = {
      glyphs: [],
      originalPosGlyphs: [],
      metrics: new paper.Group(),
      point: new paper.Point(400, 200),
      tPoint: new paper.Point(400, 200),
      prevPoint: new paper.Point(400, 200)
    };

   
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => {

      // var _g = glyph.clone();
      var _g = interpolateCompoundPath(glyph);
      
      var scale = 1 / glyph.unitsPerEm * glyph.glyphFontSize;
      var metric = new paper.Path.Line(
        new paper.Point(glyph.x - glyph.unitsPerEm * 0.45 * scale, 150), new paper.Point(glyph.x - glyph.unitsPerEm * 0.45 * scale, 550)
      );

      _this.wavyBaseline.metrics.addChild(metric);

      if (i + 1 >= _this.glyphs.length) {
        var metric = new paper.Path.Line(new paper.Point(glyph.x + glyph.unitsPerEm * 0.45 * scale, 150), new paper.Point(glyph.x + glyph.unitsPerEm * 0.45 * scale, 550));
        
        _this.wavyBaseline.metrics.addChild(metric);
      }

      glyph.visible = false;

      
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      // g.fillColor = convertBgMode(backgroundMode, "b");

      _this.wavyBaseline.glyphs.push(_g);
      let originalPosGlyph = _g.clone();
      originalPosGlyph.visible = false;
      _this.wavyBaseline.originalPosGlyphs.push(originalPosGlyph);
    });

    _this.wavyBaseline.metrics.strokeColor = convertBgMode(backgroundMode, "f");
    _this.wavyBaseline.metrics.dashArray = [1, 3];
    _this.wavyBaseline.metrics.strokeWidth = 1;

    var baseline = new paper.Path.Line(
      new paper.Point(0, yMax + 10), new paper.Point(_this.props.screenWidth, yMax + 10)
    );

    let amount = 500;
    let length = baseline.length;
    
    _this.wavyBaseline.realBaseLine = new paper.Path();

    for (let j = 0; j < amount + 1; j++) {
      let offset = j / amount * length;
      let point = baseline.getPointAt(offset);
  
      _this.wavyBaseline.realBaseLine.add(point);
    }

    baseline.remove();
    _this.wavyBaseline.realBaseLine.strokeColor = convertBgMode(backgroundMode, "f");



    _this.view.onMouseMove = (e) => {
      _this.wavyBaseline.tPoint = e.point;
    }

    var centerY = _.mean(_.map(_this.wavyBaseline.originalPosGlyphs, g => {
      return g.bounds.center.y;
    }));


    var theta = 0;
    var radiusScale = scaleLinear().domain([0, 350]).clamp(true).range([50, 300]);
    var waveScale;

    if (_this.props.screenWidth <= BODY_480) {

      waveScale = scaleLinear().domain([0, 350]).clamp(true).range([Math.PI * 0.2, Math.PI * 0.7]);
    } else {
      waveScale = scaleLinear().domain([0, 350]).clamp(true).range([Math.PI * 0.5, Math.PI * 3.5]);
      
    }

    var amplitudeScale = scaleLinear().domain([0, _this.props.screenWidth]).clamp(true).range([0, waveScale(_this.props.screenWidth)]);

    _this.view.onFrame = (e) => {
      theta += 0.02;

      _this.wavyBaseline.point = _this.wavyBaseline.point.add(_this.wavyBaseline.tPoint.subtract(_this.wavyBaseline.point).multiply(0.2));

      let dist = Math.abs(centerY - _this.wavyBaseline.point.y);
      amplitudeScale.range([0, waveScale(dist)]);

      _.each(_this.wavyBaseline.realBaseLine.segments, (seg, i) => {
        let x = theta + amplitudeScale(seg.point.x);
        seg.point.y = (yMax + 10) + Math.sin(x) * radiusScale(dist);
      });

      _.each(_this.wavyBaseline.metrics.children, (child, i) => {
        
        _.each(child.segments, (seg, j) => {

          let x = theta + amplitudeScale(seg.point.x);
          seg.point.y = (j % 2 == 0 ? 150 : 550) + Math.sin(x) * radiusScale(dist);

        });
      
      });

      _.each(_this.wavyBaseline.glyphs, (g, i) => {
        
        var originalGlyph = _this.wavyBaseline.originalPosGlyphs[i];

        _.each(g.children, (child, j) => {

          var originalChild = originalGlyph.children[j];

          _.each(child.segments, (seg, k) => {

            var originalSegment = originalChild.segments[k];
            let x = theta + amplitudeScale(seg.point.x);
            seg.point.y = originalSegment.point.y + Math.sin(x) * radiusScale(dist);


          });


        });
        
      });  

      _this.wavyBaseline.prevPoint = _this.wavyBaseline.point.clone();

    }
    

    _this.view.draw();


  },
  
  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();
    _this.wavyBaseline.metrics.strokeColor = convertBgMode(backgroundMode, "f");


    _.each(_this.wavyBaseline.glyphs, g => {
      g.strokeColor = convertBgMode(backgroundMode, "f");
      g.fillColor = convertBgMode(backgroundMode, "b");
    });


    _this.wavyBaseline.realBaseLine.strokeColor = convertBgMode(backgroundMode, "f");
    _this.wavyBaseline.metrics.strokeColor = convertBgMode(backgroundMode, "f");

    _this.view.draw();

  },


  detach: (_this) => {
    _.each(_this.wavyBaseline.glyphs, g => {
      g.remove();
    });
    
    _.each(_this.wavyBaseline.originalPosGlyph, g => {
      g.remove();
    });
    _this.wavyBaseline.realBaseLine.remove();

    _.each(_this.glyphs, (glyph, i) => {
      glyph.visible = true;
    });

    _this.wavyBaseline.metrics.remove();

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
