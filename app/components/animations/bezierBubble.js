import paper from 'paper';
import { convertBgMode } from '../../utils'; 
import { scaleLinear, scalePow } from 'd3';

const sizeScale = scaleLinear().domain([0, 300]).clamp(true).range([180, 1]);

export const bezierBubble = {
  attach: (_this, backgroundMode) => {
    _this.bezierBubble = {
      prevPoint: new paper.Point(400, 400),
      point: new paper.Point(400, 400),
      tPoint: new paper.Point(400, 400),
      points: new paper.Group(),
      size: 10,
      tSize: 10,
      firstMoved: false
    };

    
    _this.bezierBubble.maskedGlyphs = [];
    _.each(_this.glyphs, (glyph, i) => {

      _.each(glyph.children, (child, j) => {
        _.each(child.segments, (seg, k) => {
          
          let p = new paper.Path.Rectangle(seg.point.subtract(new paper.Point(2, 2)), 4);

          p.fillColor = convertBgMode(backgroundMode, 'f');
          _this.bezierBubble.points.addChild(p);
        });
      });



      glyph.strokeWidth = 0;
      glyph.fillColor = convertBgMode(backgroundMode, "f");
      var _g = glyph.clone();
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.dashArray = [1, 3];
      _g.strokeWidth = 1;
      _this.bezierBubble.maskedGlyphs.push(_g);
    });


    let dist = Math.abs(200 - _this.bezierBubble.points.bounds.center.y);

    _this.bezierBubble.tSize = sizeScale(dist);
    _this.bezierBubble.size = sizeScale(dist);
    
    _this.project.activate();


    _this.bezierBubble.maskCircle = new paper.Path.Circle({center: [400, 200], radius: _this.bezierBubble.size, fillColor: "green"});

    _this.bezierBubble.circle = new paper.Path.Circle({center: [400, 200], radius: _this.bezierBubble.size, strokeColor: convertBgMode(backgroundMode, "f")});


    _this.bezierBubble.group = new paper.Group([_this.bezierBubble.maskCircle].concat(_this.bezierBubble.maskedGlyphs).concat(_this.bezierBubble.points));
    _this.bezierBubble.group.clipped = true;


    _this.view.onMouseMove = (e) => {
      _this.bezierBubble.firstMoved = true;
      _this.bezierBubble.tPoint = e.point;
      let dist = Math.abs(_this.bezierBubble.point.y - _this.bezierBubble.points.bounds.center.y);
    
      _this.bezierBubble.tSize = sizeScale(dist);
    }

    var theta = 0;

    _this.view.onFrame = (e) => {
      theta += 0.06;
      _this.project.activate();

      _this.bezierBubble.point = _this.bezierBubble.point.add(_this.bezierBubble.tPoint.subtract(_this.bezierBubble.point).multiply(0.2));
      let len = _this.bezierBubble.point.subtract(_this.bezierBubble.prevPoint).length;

      _this.bezierBubble.size += (_this.bezierBubble.tSize - _this.bezierBubble.size) * 0.2;
      // _this.bezierBubble.size += Math.sin(theta + Math.PI * 2) * 1.2; //breathing amount
      _this.bezierBubble.size += Math.sin(theta + Math.PI * 2) * _this.bezierBubble.tSize / 100; //breathing amount

      if (_this.bezierBubble.firstMoved) {
        _this.bezierBubble.circle.visible = true;
        _this.bezierBubble.maskCircle.visible = true;
        _this.bezierBubble.group.visible = true;
      } else {
        _this.bezierBubble.circle.visible = false;
        _this.bezierBubble.maskCircle.visible = false;
        _this.bezierBubble.group.visible = false;
      }
      let radius = _this.bezierBubble.maskCircle.bounds.width / 2;
      _this.bezierBubble.maskCircle.position = _this.bezierBubble.point;
      _this.bezierBubble.circle.position = _this.bezierBubble.point;
      _this.bezierBubble.maskCircle.scale(_this.bezierBubble.size / radius);
      _this.bezierBubble.circle.scale(_this.bezierBubble.size / radius);
      
      _this.bezierBubble.prevPoint = _this.bezierBubble.point.clone();




      _this.view.draw();
    };

    _this.view.draw();
  }, 

  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.bezierBubble.maskedGlyphs, g => {
      g.strokeColor = convertBgMode(backgroundMode, "f");
      g.fillColor = convertBgMode(backgroundMode, "b");
    });


    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
    });

    _this.bezierBubble.points.fillColor = convertBgMode(backgroundMode, "f");


    _this.bezierBubble.circle.strokeColor = convertBgMode(backgroundMode, "f");

    _this.view.draw();

  },

  detach: (_this) => {

    _this.bezierBubble.circle.remove();
    _this.bezierBubble.maskCircle.remove();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.strokeWidth = 1;
    });



    _.each(_this.bezierBubble.maskedGlyphs, g => {
      g.remove();
    });


    _this.bezierBubble.group.remove();
    _this.bezierBubble.points.remove();

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.onMouseEnter = null;
  }
};
