import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { BODY_600, BODY_480 } from '../constants/defaults';
import { connect } from 'react-redux';
import { convertBgMode } from '../utils';
import { scaleLinear } from 'd3';

const Fragment = React.Fragment;
class FontOutlineViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];
  }

  componentDidMount(){
    paper.setup(this.refCanvas);
    this.project = paper.View._viewsById[this.refCanvas.id]._project;
    this.view = paper.View._viewsById[this.refCanvas.id];

    var { font, message, category, screenWidth, backgroundMode, size, fontSize, letterSpacing, baseline } = this.props;
    // console.log (fontSize + "," + baseline);
    this.createGlyphPath(font, message, size, backgroundMode, fontSize, letterSpacing, baseline, screenWidth, category);
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
     } else if (newProps.screenWidth != this.props.screenWidth || 
               newProps.screenHeight != this.props.screenHeight) {
      this.resetMessage(newProps);
    } else if (newProps.backgroundMode != this.props.backgroundMode) {
      this.changeColor(newProps);
    }
  }

  changeColor(props) {
    let { backgroundMode } = props;
    _.each(this.glyphs, g => {
      g.strokeColor = convertBgMode(backgroundMode, "f");
      g.fillColor = convertBgMode(backgroundMode, "b");
    });
  }

  createGlyphPath(font, message, size, backgroundMode, fontSize, letterSpacing, baseline, screenWidth, category){
    var fontGlyphs = font.stringToGlyphs(message);
    var kerning = true;
    var kerningValue = 0;

    size = size * fontSize || 300;

    var x;

    if (category === 3) {
      x = 24;
    } else {
      x = screenWidth > BODY_480 ? 24 : 0;
    }
    var fontScale = 1 / font.unitsPerEm * size;
    
    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: size * 0.89 * baseline,
        strokeColor: convertBgMode(backgroundMode, "f"),
        fillColor: convertBgMode(backgroundMode, "b"),
        fontSize: size,
        unitsPerEm: font.unitsPerEm
      });
      this.glyphs.push(glyph);
      glyph.init();


      if (glyphData.advanceWidth) {
        x += glyphData.advanceWidth * fontScale; // glyphData.advanceWidth
      }
      if (i < fontGlyphs.length - 1) {
        kerningValue = font.getKerningValue(glyphData, fontGlyphs[i + 1]);
        x += kerningValue * fontScale;
        
      }

      x += letterSpacing * fontScale;

    });

    // debugger;

  }


  resetMessage(props){
    let { message, font, category, screenWidth, backgroundMode, size, fontSize, letterSpacing, baseline } = props;
    
    this.project.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message, size, backgroundMode, fontSize, letterSpacing, baseline, screenWidth, category);
    this.view.draw();

  }


  componentDidUpdate(){

    let { screenWidth, category, containerHeight } = this.props;
    let leftWidthScale, width, height;
    
    if (category === 3) {
       if (screenWidth > BODY_600){
      
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        width = ((screenWidth * 0.5)- 24 * 2) - leftWidthScale(screenWidth);
        height = containerHeight;

      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {
        
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        width = (screenWidth - 24 * 2) - leftWidthScale(screenWidth);
        height = containerHeight;

      
      } else {

        width = screenWidth - 24 * 2;
        height = containerHeight;

      }
      
      this.view.viewSize = new paper.Size(width, height);

    } else {

      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);
      this.view.viewSize = new paper.Size( (screenWidth - 24 * 2) - leftWidthScale(screenWidth), containerHeight );
    }
    
  }

  render() {
    let { screenWidth, id, category, containerHeight } = this.props;
    let width, height, leftWidthScale;

    if (category === 3) {
      

      if (screenWidth > BODY_600){
      
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        width = ((screenWidth * 0.5)- 24 * 2) - leftWidthScale(screenWidth);
        height = containerHeight;

      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {
        
        leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
        width = (screenWidth - 24 * 2) - leftWidthScale(screenWidth);
        height = containerHeight;

      
      } else {

        width = screenWidth - 24 * 2;
        height = containerHeight;

      }

    } else {

      if (screenWidth < BODY_480) {

        width = (screenWidth - 24 * 2);
        height = containerHeight;

      } else {

        let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);
        width = (screenWidth - 24 * 2) - leftWidthScale(screenWidth);
        height = containerHeight;
      }

    }

    return (
        <canvas onMouseEnter={this.props.onMouseEnter} id={ id.toLowerCase().replace(/ /g, "-") } ref={ ref => { this.refCanvas = ref;} } width={width * 2 } height={ height } style={{ width: width, height: height}}>
        </canvas>
    );
  }
}


let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(FontOutlineViewer);