import paper from 'paper';
import { convertBgMode } from '../../utils';
import 'gsap';
import { scaleLinear, scalePow, scaleSqrt } from 'd3';

export const riseAndBlur = {
  attach: (_this, backgroundMode) => {

    _this.riseAndBlur = {
      point: new paper.Point(400, 200),
      tPoint: new paper.Point(400, 200),
      lgCenter: new paper.Point(400, 200),
      originalPos: []
    };
    
    _this.project.activate();

    _this.riseAndBlur.blurGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      // glyph.strokeWidth = 0;
      
      if (i == 0) {
        _this.riseAndBlur.lgCenter = glyph.bounds.center;
      }
      _this.riseAndBlur.originalPos.push(glyph.position.clone());

      var _g = glyph.clone();
      _this.riseAndBlur.blurGlyphs.push(_g);

      glyph.visible = false;
      _g.fillColor = convertBgMode(backgroundMode, "f");

    });
    _this.view.onMouseMove = (e) => {
      _this.riseAndBlur.tPoint = e.point;
    }

    var len = _this.riseAndBlur.blurGlyphs.length - 1;
    var middle = len / 2;


    var blurAmountScale = scalePow().domain([0, 100]).clamp(true).range([0, 10]);
    var offsetScale = scaleSqrt().domain([0, 200]).clamp(true).range([0, 150])

    _this.view.onFrame = (e) => {
      

      _this.riseAndBlur.point = _this.riseAndBlur.point.add(_this.riseAndBlur.tPoint.subtract(_this.riseAndBlur.point).multiply(0.2));

      let dist = _this.riseAndBlur.lgCenter.y - _this.riseAndBlur.point.y;

      _this.refCanvas.style.filter = `blur(${blurAmountScale(Math.abs(dist))}px)`;

      _.each(_this.riseAndBlur.blurGlyphs, (g, i) => {
        let offsetNum;

        if (dist > 0) {
          offsetNum = middle - i;  
        } else {
          offsetNum = i - middle;    
        }
        
        g.position = new paper.Point(_this.riseAndBlur.originalPos[i].x, _this.riseAndBlur.originalPos[i].y + offsetNum * offsetScale(Math.abs(dist)));
      });
    };


    _this.view.draw();

  }, 


  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.riseAndBlur.blurGlyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
    });

    _this.view.draw();

  },


  detach: (_this) => {
    TweenMax.killAll();
    _this.project.activate();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.visible = true;
    });

    _.each(_this.riseAndBlur.blurGlyphs, g => {
      g.remove();
    });

    _this.refCanvas.style.filter = "blur(0)";

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }
};
