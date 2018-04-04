import paper from 'paper';
import _ from 'lodash';

class Glyph extends paper.CompoundPath{
  constructor(params){
    super();
    this.fontGlyph = params.glyph;
    this.strokeColor = params.strokeColor || 'black';
    this.fillColor = params.fillColor || "white";
    this.x = params.x;
    this.y = params.y || 150;
    this.glyphFontSize = params.fontSize;
    this.unitsPerEm = params.unitsPerEm;
    this.currentPath = null;
    this.rightMargin = 30;

  }

  init(){

    var x = 0;
    var y = 0;

    var scale = 1 / this.unitsPerEm * this.glyphFontSize;
    _.each(this.fontGlyph.path.commands, (cmd, i) => { 

      if (cmd.type === 'M') {
        if (!_.isNull(this.currentPath)){
          this.currentPath.closed = true;
        }
        
        this.currentPath = new paper.Path();
        this.addChild(this.currentPath);

        var pt = new paper.Point(this.x + cmd.x * scale, this.y + (- cmd.y * scale) );
        // this.currentPath.add(pt);
        this.currentPath.moveTo(pt);



      } else if (cmd.type === 'L') {

        this.currentPath.add(new paper.Point(this.x + (cmd.x * scale), this.y + (- cmd.y * scale)));
        
        var pt = new paper.Point(this.x + cmd.x * scale, this.y + (- cmd.y * scale));        
        // this.currentPath.add(pt);
        this.currentPath.lineTo(pt);
        
        

      } else if (cmd.type === 'C') {

        // ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        
        var handle1 = new paper.Point(this.x + (cmd.x1 * scale), this.y + (- cmd.y1 * scale));  
        var handle2 = new paper.Point(this.x + (cmd.x2 * scale), this.y + (- cmd.y2 * scale));  
        var pt = new paper.Point(this.x + (cmd.x * scale), this.y + (- cmd.y * scale));  

        this.currentPath.cubicCurveTo(handle1, handle2, pt);  
        

      } else if (cmd.type === 'Q') {
      
        var handle = new paper.Point(this.x + (cmd.x1 * scale), this.y + (- cmd.y1 * scale));   
        var pt = new paper.Point(this.x + (cmd.x * scale), this.y + (- cmd.y * scale));  

        
        this.currentPath.quadraticCurveTo(handle, pt);
      
      } else if (cmd.type === 'Z') {
        this.currentPath.closed = true;
      }
      


    });

  
  }

}

export default Glyph;