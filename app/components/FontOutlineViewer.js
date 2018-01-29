import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';

class FontOutlineViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];
  }

  componentDidMount(){
    paper.setup(this.refCanvas);
    this.project = paper.View._viewsById[this.refCanvas.id]._project;
    this.view = paper.View._viewsById[this.refCanvas.id];

    var { font, message } = this.props;
    this.createGlyphPath(font, message);
    
    this.project.activate();
    this.view.draw();
  }

  componentWillUnmount(){
    this.view.remove();
    this.project.remove();
  }

  componentWillReceiveProps(newProps){
    if (newProps.message != this.props.message) {
      this.resetMessage(newProps);
    }
  }

  createGlyphPath(font, message){
    var fontGlyphs = font.stringToGlyphs(message);
    var kerning = true;
    var kerningValue = 0;

    var fontSize = 300;
    var x = 160;
    var fontScale = 1 / font.unitsPerEm * fontSize;

    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: 150,
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

    // debugger;

  }

  resetMessage(props){
    let { message, font } = props;
    
    this.project.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message);
    this.view.draw();

  }


  componentDidUpdate(){

    let { screenWidth } = this.props;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);

    this.view.viewSize = new paper.Size( screenWidth - (leftWidthScale(screenWidth) + 24 * 2), 400 );

  }

  render() {
    let { screenWidth, id } = this.props;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);

    let width = screenWidth - (leftWidthScale(screenWidth) + 24 * 2);
    // debugger;
    return (
      <canvas id={ id.toLowerCase().replace(/ /g, "-") } ref={ ref => { this.refCanvas = ref;} } width={width * 2} height="400" style={{ width: width, height: 400}}>
      </canvas>
    );
  }
}


let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth
  }
}

export default connect(mapStateToProps)(FontOutlineViewer);