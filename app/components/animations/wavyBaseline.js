import paper from 'paper';
import { convertBgMode } from '../../utils';

export const wavyBaseline = {
  attach: (_this, backgroundMode) => {
    // console.log(fontAn);
    _this.wavyBaseline = {
      glyphs: []
    };
    
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => {

      var _g = glyph.clone();
      glyph.visible = false;
      
      _g.flatten(1);
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      // g.fillColor = convertBgMode(backgroundMode, "b");

      _this.wavyBaseline.glyphs.push(_g);
    });


    _this.view.onFrame = (e) => {

    var i = 0;
      _.each(_this.wavyBaseline.glyphs, g => {
        
        _.each(g.children, child => {

          _.each(child.segments, (seg, j) => {

            let p = seg.point.clone();

            if (j % 2 == 0) {
              seg.point = new paper.Point(p.x, p.y + Math.sin(e.time + i) * 0.25);  
            } else {
              seg.point = new paper.Point(p.x, p.y + Math.cos(e.time + i) * 0.25);
            }
            
            i+= 1;
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
