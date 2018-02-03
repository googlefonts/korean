import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { BODY_600, BODY_480 } from '../constants/defaults';
import { magnifyScript, bezierShowScript } from './animations';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { convertBgMode } from '../utils';

const Fragment = React.Fragment;
class FontAnimScriptViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];

    this.containerHeight = 400;
    this.animations = [
      magnifyScript,
      bezierShowScript
    ];
  }

  componentDidMount(){

    paper.setup(this.refCanvas);
    this.project = paper.View._viewsById[this.refCanvas.id]._project;
    this.view = paper.View._viewsById[this.refCanvas.id];


    var { font, message, screenHeight, screenWidth, animationScriptIdx, backgroundMode } = this.props;

    this.createGlyphPath(font, message, this.getSize(screenWidth), backgroundMode);

    this.attachAnimation(this.props);
    this.project.activate();

    this.view.draw();
  }

  componentWillUnmount(){
    this.detachAnimation(this.props);
    this.project.remove();
    this.view.remove();
  }

  componentWillReceiveProps(newProps){
    if (newProps.message != this.props.message) {
      this.resetMessage(newProps);
    } else if (newProps.screenWidth != this.props.screenWidth || 
               newProps.screenHeight != this.props.screenHeight) {
      this.updatePosition(newProps);
    } else if (newProps.animationScriptIdx != this.props.animationScriptIdx) {
      this.detachAnimation(this.props);
      this.attachAnimation(newProps);
    } else if (newProps.backgroundMode != this.props.backgroundMode){
      this.bgModeAnimation(newProps);
    }
  }
  
  bgModeAnimation(props){
    let { backgroundMode, animationScriptIdx } = props;

    this.animations[animationScriptIdx].changeBgMode.bind(this, this)(backgroundMode);
   
  }

  detachAnimation(props){
    let { animationScriptIdx } = props;
    this.animations[animationScriptIdx].detach.bind(this, this)();
  }


  attachAnimation(props){
    let { animationScriptIdx, backgroundMode } = props;
    this.animations[animationScriptIdx].attach.bind(this, this)(backgroundMode);
  }

  updatePosition(props){

    // let { screenHeight, screenWidth, font, animationScriptIdx } = props;
    // let leftWidthScale = scaleLinear().domain([600, 1440]).clamp(true).range([105, 210]);


    // var fontSize = 300;
    // var kerningValue = 0;
    // var fontScale = 1 / font.unitsPerEm * fontSize;
    // var x, y;

    // if (screenWidth > 480) {
    //   x = 24 + 160 + leftWidthScale(screenWidth);
    //   y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150;
    // } else {
    //   x = 24 + 160;
    //   y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150 + 46;
    // }
    

    // this.project.activate();    

    // _.each(this.glyphs, (glyph, i) => {
    //   glyph.x = x;
    //   glyph.y = y;
    //   glyph.updatePosition();

    //   if (glyph.fontGlyph.advanceWidth) {
    //     x += glyph.fontGlyph.advanceWidth * fontScale;
    //   }
    //   if (i < this.glyphs.length - 1) {
    //     kerningValue = font.getKerningValue(glyph.fontGlyph, this.glyphs[i + 1].fontGlyph);
    //     x += kerningValue * fontScale;
    //   }
    // });


    // if (screenWidth > 480) {
    //   x = 24 + 160 + leftWidthScale(screenWidth);
    //   y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150;
    // } else {
    //   x = 24 + 160;
    //   y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150 + 46;
    // }
    

    // this.animations[animationScriptIdx].updatePosition.bind(this, this)(x, y, fontScale, font);

    // this.view.draw();

  }

  createGlyphPath(font, message, size, backgroundMode){

    var fontGlyphs = font.stringToGlyphs(message);
    var kerning = true;
    var kerningValue = 0;
    let leftWidthScale = scaleLinear().domain([600, 1440]).clamp(true).range([105, 210]);

  
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
        fillColor: convertBgMode(backgroundMode, "f"),
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
    let { message, font, screenHeight, screenWidth, animationScriptIdx, backgroundMode } = props;
    
    this.project.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message, this.getSize(screenWidth), backgroundMode);

    
    this.detachAnimation(props);
    this.attachAnimation(props);

    this.view.draw();

  }


  getSize(screenWidth) {

    if (screenWidth > BODY_600){
      
      return 150;
    
    } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {

      return 250;
    
    } else {

      return 300;

    }
  }



  componentDidUpdate(){

   
    let { screenWidth, category } = this.props;
    let leftWidthScale;
    
      
    if (screenWidth > BODY_600){
    
      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
      this.view.viewSize = new paper.Size( (screenWidth - 24 * 2) * 0.5 - leftWidthScale(screenWidth), 200);
    
    } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {

      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
      this.view.viewSize = new paper.Size( (screenWidth - 24 * 2) - leftWidthScale(screenWidth), 300);
    
    } else {

      this.view.viewSize = new paper.Size(screenWidth - 24 * 2, 400);

    }

  }

  render() {
    let { screenWidth, id, category } = this.props;
    let width, height, leftWidthScale;


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

    return (
      <canvas id={ id.toLowerCase().replace(/ /g, "-") } ref={ ref => { this.refCanvas = ref;} } width={width * 2} height={ height } style={{ width: width, height: height}}>
      </canvas>
    );
  }
}


let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    animationScriptIdx: state.animationScriptIdx,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(FontAnimScriptViewer);