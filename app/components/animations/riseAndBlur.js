import paper from 'paper';
import { convertBgMode } from '../../utils';
import 'gsap';

export const riseAndBlur = {
  attach: (_this, backgroundMode) => {

    _this.riseAndBlur = {
    };
    
    _this.project.activate();

    _this.riseAndBlur.blurGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      // glyph.strokeWidth = 0;
      
      var _g = glyph.clone();
      _this.riseAndBlur.blurGlyphs.push(_g);

      glyph.visible = false;
      _g.fillColor = convertBgMode(backgroundMode, "f");

    });

    var t = {
      blurAmount: 0
    };

    TweenMax.to(t, 2.0 + _this.riseAndBlur.blurGlyphs.length * 0.2, { blurAmount: 10, repeat: 9999, yoyo: true, onUpdate: e => {
        _this.refCanvas.style.filter = `blur(${t.blurAmount}px)`;
    }});

    
    _.each(_this.riseAndBlur.blurGlyphs, (g, i) => {
      g.tween = {
        yOriginal: g.position.y,
        yOffset: g.position.y + 200
      };


      g.position = new paper.Point(g.position.x, g.tween.yOffset);

      TweenMax.to(g.tween, 2.0, { yoyo: true, repeat: 9999, delay: i * 0.2, ease: Power3.easeOut, yOffset: g.tween.yOriginal - 200, onUpdate: () => {

        _this.project.activate();
        g.position = new paper.Point(g.position.x, g.tween.yOffset);
        // console.log(g.position.x, g.position.y);
        _this.view.draw();
      }});

    });

    



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

    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
   

  }
};
