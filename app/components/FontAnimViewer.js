import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';

const Fragment = React.Fragment;
class FontAnimViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];

    this.containerHeight = 400;
  }

  componentDidMount(){
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.refCanvas);

    var { font, message, screenHeight, screenWidth } = this.props;
    this.createGlyphPath(font, message, screenWidth, screenHeight);

    this.paperScope.activate();
    this.paperScope.view.draw();
  }

  componentWillReceiveProps(newProps){
    if (newProps.message != this.props.message) {
      this.resetMessage(newProps);
    } else if (newProps.screenWidth != this.props.screenWidth) {
      this.updatePosition(newProps);
    }
  }

  updatePosition(props){

    let { screenHeight, screenWidth, font } = this.props;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([24, 391]);

    var x = leftWidthScale(screenWidth);
    var fontSize = 300;
    var kerningValue = 0;
    var fontScale = 1 / font.unitsPerEm * fontSize;

    _.each(this.glyphs, (glyph, i) => {
      glyph.x = x;
      glyph.updatePosition();

      if (glyph.fontGlyph.advanceWidth) {
        x += glyph.fontGlyph.advanceWidth * fontScale;
      }
      if (i < this.glyphs.length - 1) {
        kerningValue = font.getKerningValue(glyph.fontGlyph, this.glyphs[i + 1].fontGlyph);
        x += kerningValue * fontScale;
      }
    });

    this.paperScope.activate();
    this.paperScope.view.draw();
  }

  createGlyphPath(font, message, screenWidth, screenHeight){

    var fontGlyphs = font.stringToGlyphs(message);
    var kerning = true;
    var kerningValue = 0;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([24, 391]);

    var fontSize = 300;
    var x = leftWidthScale(screenWidth);
    var fontScale = 1 / font.unitsPerEm * fontSize;

    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: this.containerHeight * 0.5 + 140,
        fontSize: fontSize,
        fillColor: 'black',
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
    let { message, font, screenHeight, screenWidth } = props;
    
    this.paperScope.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message,  screenWidth, screenHeight);
    this.paperScope.view.draw();

  }


  componentDidUpdate(){

    let { screenWidth, screenHeight } = this.props;
    this.paperScope.view.viewSize = new paper.Size( screenWidth, screenHeight );

  }

  render() {
    let { screenWidth, screenHeight } = this.props;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);
    let width = screenWidth - (leftWidthScale(screenWidth) + 24 * 2);

    return (
      <Fragment>
        <div className="font-anim-viewer" style={{ top: -screenHeight * 0.5 + this.containerHeight * 0.5 }}>
          <canvas ref={ ref => { this.refCanvas = ref;} } width={screenWidth} height={screenHeight} style={{ width: screenWidth, height: screenHeight}}>
          </canvas>
        </div>
        <div style={{ width: width, height: this.containerHeight}}>
        </div>
      </Fragment>
    );
  }
}


let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    animationIdx: state.animationIdx
  }
}

export default connect(mapStateToProps)(FontAnimViewer);