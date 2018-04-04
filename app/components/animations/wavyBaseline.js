import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear, min, scalePow } from 'd3';
import { BODY_480 } from '../../constants/defaults';

const amountScale = scaleLinear().domain([150, 2000]).clamp(true).range([50, 300]);

const interpolateCompoundPath = (path) => {
  var interpolatedPath = new paper.CompoundPath();
    
  for (var i = 0; i < path.children.length; i++) {
      var childIntPath = new paper.Path();
      var child = path.children[i];
      var amount = Math.floor(amountScale(child.length));
      var length = child.length;
      
      for (var j = 0; j < amount + 1; j++) {
          var offset = j / amount * length;
          var point = child.getPointAt(offset);
          

          childIntPath.add(point);
      }
      childIntPath.closed = true;
      interpolatedPath.addChild(childIntPath);
  }  
  // interpolatedPath.fullySelected = true;
  return interpolatedPath;
};

export const wavyBaseline = {
  attach: (_this, backgroundMode, size) => {
    // console.log(fontAn);
    _this.wavyBaseline = {
      glyphs: [],
      originalPosGlyphs: [],
      metrics: new paper.Group(),
      point: new paper.Point(765, 200),
      tPoint: new paper.Point(765, 200),
      prevPoint: new paper.Point(400, 200),
      centerY: 600,
      bottomY: 800
    };

   
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => {
      if (i == 0) {
        _this.wavyBaseline.centerY = glyph.bounds.center.y;
        _this.wavyBaseline.bottomY = glyph.bounds.bottom;

      }


      var _g = interpolateCompoundPath(glyph);
      
      var scale = 1 / glyph.unitsPerEm * glyph.glyphFontSize;
      var metric = new paper.Path.Line(
        new paper.Point(glyph.x, size * 0.6), new paper.Point(glyph.x, size * 1.8)
      );

      metric.strokeColor = convertBgMode(backgroundMode, "f");
      metric.dashArray = [1, 3];
      metric.strokeWidth = 1;

      _this.wavyBaseline.metrics.addChild(metric);

      if (i + 1 >= _this.glyphs.length) {
        var metric = new paper.Path.Line(new paper.Point(glyph.x + glyph.fontGlyph.advanceWidth * scale, _this.wavyBaseline.centerY - size * 0.6), new paper.Point(glyph.x + glyph.fontGlyph.advanceWidth * scale, _this.wavyBaseline.centerY + size * 0.6));
        metric.strokeColor = convertBgMode(backgroundMode, "f");
        metric.dashArray = [1, 3];
        metric.strokeWidth = 1;

        _this.wavyBaseline.metrics.addChild(metric);
      }

      glyph.visible = false;

      
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      _g.fillColor = convertBgMode(backgroundMode, "f");

      _this.wavyBaseline.glyphs.push(_g);
      let originalPosGlyph = _g.clone();
      originalPosGlyph.visible = false;
      _this.wavyBaseline.originalPosGlyphs.push(originalPosGlyph);
    });

    _this.wavyBaseline.metrics.strokeColor = convertBgMode(backgroundMode, "f");
    _this.wavyBaseline.metrics.dashArray = [1, 3];
    _this.wavyBaseline.metrics.strokeWidth = 1;

    var baseline = new paper.Path.Line(
      new paper.Point(0, _this.wavyBaseline.bottomY + 10), new paper.Point(_this.props.screenWidth, _this.wavyBaseline.bottomY + 10)
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

    var centerX = _this.wavyBaseline.originalPosGlyphs[0].bounds.left;



    var theta = 0;
    var radiusScale;
    var waveScale, waveSpeed;

    if (_this.props.screenWidth <= BODY_480) {
      radiusScale = scalePow().domain([0, 350]).clamp(true).range([50, 80]); //MAX height
    } else {
      radiusScale = scalePow().domain([0, 350]).clamp(true).range([50, 160]); //MAX height
    }

    if (_this.props.screenWidth <= BODY_480) {

      waveScale = scalePow().domain([0, _this.view.viewSize.width - centerX]).clamp(true).range([Math.PI * 0.2, Math.PI * 0.6]);
      // waveSpeed = scalePow().domain([0, _this.view.viewSize.width - centerX]).clamp(true).range([0.02, 0.1]);

    } else {

      waveScale = scalePow().domain([0, _this.view.viewSize.width - centerX]).clamp(true).range([Math.PI * 0.5, Math.PI * 4]); //# of waves
      // waveSpeed = scalePow().domain([0, _this.view.viewSize.width - centerX]).clamp(true).range([0.02, 0.1]);
      
    }

    var amplitudeScale = scaleLinear().domain([0, _this.props.screenWidth]).clamp(true).range([0, waveScale(_this.props.screenWidth)]);

    _this.view.onFrame = (e) => {
      // theta += waveSpeed;
      theta += 0.05;

      _this.wavyBaseline.point = _this.wavyBaseline.point.add(_this.wavyBaseline.tPoint.subtract(_this.wavyBaseline.point).multiply(0.2));

      let dist = Math.max(0, -(centerX - _this.wavyBaseline.point.x));

      amplitudeScale.range([0, waveScale(dist)]);

      _.each(_this.wavyBaseline.realBaseLine.segments, (seg, i) => {
        let x = theta + amplitudeScale(seg.point.x);
        seg.point.y = (_this.wavyBaseline.bottomY + 10) + Math.sin(x) * radiusScale(dist);
      });

      _.each(_this.wavyBaseline.metrics.children, (child, i) => {
        
        _.each(child.segments, (seg, j) => {

          let x = theta + amplitudeScale(seg.point.x);
          seg.point.y = (j % 2 == 0 ? (_this.wavyBaseline.centerY - (size * 0.6)) : (_this.wavyBaseline.centerY + (size * 0.6)) ) + Math.sin(x) * radiusScale(dist);

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
  }
};