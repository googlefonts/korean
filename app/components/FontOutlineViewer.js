import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';

class FontOutlineViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];
  }

  componentDidMount(){
    paper.setup(this.refCanvas);

    var { font } = this.props;
    var fontGlyphs = font.stringToGlyphs('배현진');
    var kerning = true;
    var kerningValue = 0;

    var fontSize = 200;
    var x = 80;
    var fontScale = 1 / font.unitsPerEm * fontSize;

    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        fontSize: fontSize,
        unitsPerEm: font.unitsPerEm
      });
      this.glyphs.push(glyph);
      glyph.init();


      if (glyphData.advanceWidth) {
        x += glyphData.advanceWidth * fontScale;
      }
      if (i < fontGlyphs.length - 1) {
        kerningValue = font.getKerningValue(glyphData, fontGlyphs[i + 1]);
        x += kerningValue * fontScale;
      }

    });

    paper.view.draw();
  }

  render() {
    return (
      <canvas ref={ ref => { this.refCanvas = ref;} } style={{ width: 800, height: 400}}>
      </canvas>
    );
  }
}

export default FontOutlineViewer;
