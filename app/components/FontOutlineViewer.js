import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { BODY_600, BODY_480 } from '../constants/defaults';
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

    var { font, message, category, screenWidth } = this.props;

    this.createGlyphPath(font, message, this.getSize(category, screenWidth));
    
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

  createGlyphPath(font, message, size){
    var fontGlyphs = font.stringToGlyphs(message);
    var kerning = true;
    var kerningValue = 0;

    var fontSize = size || 300;
    var x = size * 0.5 + 10 * 0.5;
    var fontScale = 1 / font.unitsPerEm * fontSize;

    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: fontSize * 0.5,
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

  getSize(category, screenWidth) {
    if (category === 3) {

      if (screenWidth > BODY_600){
        
        return 150;
      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {

        return 250;
      
      } else {

        return 300;

      }

    } else {
      return 300;
    }
  }

  resetMessage(props){
    let { message, font, category, screenWidth} = props;
    
    this.project.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message, this.getSize(category, screenWidth));
    this.view.draw();

  }


  componentDidUpdate(){

    let { screenWidth, category } = this.props;
    let leftWidthScale;
    
    if (category === 3) {
      
      if (screenWidth > BODY_600){
      
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        this.view.viewSize = new paper.Size( (screenWidth - 24 * 2) * 0.5 - leftWidthScale(screenWidth), 200);
      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {

        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        this.view.viewSize = new paper.Size( (screenWidth - 24 * 2) - leftWidthScale(screenWidth), 300);
      
      } else {

        this.view.viewSize = new paper.Size(screenWidth - 24 * 2, 400);

      }

    } else {

      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);
      this.view.viewSize = new paper.Size( (screenWidth - 24 * 2) - leftWidthScale(screenWidth), 400 );
    }
    
  }

  render() {
    let { screenWidth, id, category } = this.props;
    let width, height, leftWidthScale;

    if (category === 3) {
      

      if (screenWidth > BODY_600){
      
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        width = (screenWidth - 24 * 2) * 0.5 - leftWidthScale(screenWidth);
        height = 200;

      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {
        
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        width = (screenWidth - 24 * 2) - leftWidthScale(screenWidth);
        height = 300;

      
      } else {

        width = screenWidth - 24 * 2;
        height = 400;

      }

    } else {

      if (screenWidth < BODY_480) {

        width = (screenWidth - 24 * 2);
        height = 400;

      } else {

        let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);
        width = (screenWidth - 24 * 2) - leftWidthScale(screenWidth);
        height = 400;
      }

    }

    return (
      <canvas id={ id.toLowerCase().replace(/ /g, "-") } ref={ ref => { this.refCanvas = ref;} } width={width * 2} height={ height } style={{ width: width, height: height}}>
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