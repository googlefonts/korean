import { bezierBubble } from './bezierBubble';
import { wavyBaseline } from './wavyBaseline';
import { magnifyScript } from './magnifyScript';
import { bezierShowScript } from './bezierShowScript';

export {
  bezierBubble,
  wavyBaseline,
  // script
  magnifyScript,
  bezierShowScript
}

/*

import paper from 'paper';
export const wavyBaseline = {
  attach: (_this) => {
    // console.log(fontAn);

    _this.wavyBaseline = {
      glyphs: []
    };
    

    
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => {

      var _g = glyph.clone();
      glyph.visible = false;
      
      _g.fillColor = "blue";
      _this.wavyBaseline.glyphs.push(_g);
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

  },

  updatePosition: (_this, x, y, fontScale, font) => {

  }
};

*/