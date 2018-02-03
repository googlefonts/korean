import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { wavyBaseline, bezierBubble } from './animations';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';

const Fragment = React.Fragment;
class FontAnimViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];

    this.containerHeight = 400;
    this.animations = [
      bezierBubble,
      wavyBaseline
    ];
  }

  componentDidMount(){

    paper.setup(this.refCanvas);
    this.project = paper.View._viewsById[this.refCanvas.id]._project;
    this.view = paper.View._viewsById[this.refCanvas.id];


    var { font, message, screenHeight, screenWidth, animationIdx, backgroundMode } = this.props;
    this.createGlyphPath(font, message, screenWidth, screenHeight, backgroundMode);

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
    } else if (newProps.animationIdx != this.props.animationIdx) {
      this.detachAnimation(this.props);
      this.attachAnimation(newProps);
    } else if (newProps.backgroundMode != this.props.backgroundMode){
      this.bgModeAnimation(newProps);
    }
  }

  bgModeAnimation(props){
    let { backgroundMode, animationIdx } = props;

    this.animations[animationIdx].changeBgMode.bind(this, this)(backgroundMode);
   
  }

  detachAnimation(props){
    let { animationIdx } = props;
    this.animations[animationIdx].detach.bind(this, this)();
  }


  attachAnimation(props){
    let { animationIdx, backgroundMode } = props;
    this.animations[animationIdx].attach.bind(this, this)(backgroundMode);
  }

  updatePosition(props){

    let { screenHeight, screenWidth, font, animationIdx } = props;
    let leftWidthScale = scaleLinear().domain([600, 1440]).clamp(true).range([105, 210]);


    var fontSize = 300;
    var kerningValue = 0;
    var fontScale = 1 / font.unitsPerEm * fontSize;
    var x, y;

    if (screenWidth > 480) {
      x = 24 + 160 + leftWidthScale(screenWidth);
      y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150;
    } else {
      x = 24 + 160;
      y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150 + 46;
    }
    

    this.project.activate();    

    _.each(this.glyphs, (glyph, i) => {
      glyph.x = x;
      glyph.y = y;
      glyph.updatePosition();

      if (glyph.fontGlyph.advanceWidth) {
        x += glyph.fontGlyph.advanceWidth * fontScale;
      }
      if (i < this.glyphs.length - 1) {
        kerningValue = font.getKerningValue(glyph.fontGlyph, this.glyphs[i + 1].fontGlyph);
        x += kerningValue * fontScale;
      }
    });


    if (screenWidth > 480) {
      x = 24 + 160 + leftWidthScale(screenWidth);
      y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150;
    } else {
      x = 24 + 160;
      y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150 + 46;
    }
    

    this.animations[animationIdx].updatePosition.bind(this, this)(x, y, fontScale, font);

    this.view.draw();

  }

  createGlyphPath(font, message, screenWidth, screenHeight, backgroundMode){

    var fontGlyphs = font.stringToGlyphs(message);
    var kerning = true;
    var kerningValue = 0;
    let leftWidthScale = scaleLinear().domain([600, 1440]).clamp(true).range([105, 210]);

    var fontSize = 300;
    var x, y;

    if (screenWidth > 480) {
      x = 24 + 160 + leftWidthScale(screenWidth);
      y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150;
    } else {
      x = 24 + 160;
      y = (screenHeight * 0.5 - this.containerHeight * 0.5) + 150 + 46;
    }

    var fontScale = 1 / font.unitsPerEm * fontSize;

    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: y,
        fontSize: fontSize,
        fillColor: backgroundMode == "black" ? "white" : "black",
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
    let { message, font, screenHeight, screenWidth, animationIdx, backgroundMode } = props;
    
    this.project.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message,  screenWidth, screenHeight, backgroundMode);
    
    this.detachAnimation(props);
    this.attachAnimation(props);

    this.view.draw();

  }


  componentDidUpdate(){

    let { screenWidth, screenHeight } = this.props;
    this.view.viewSize = new paper.Size( screenWidth, screenHeight );

  }

  render() {
    let { screenWidth, screenHeight, id } = this.props;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 230]);
    let width = screenWidth - (leftWidthScale(screenWidth) + 24 * 2);

    return (
      <Fragment>
        <div className="font-anim-viewer" style={{ height: screenHeight, top: -(screenHeight * 0.5 - this.containerHeight * 0.5) }}>
          <canvas id={ id.toLowerCase().replace(/ /g, "-") } ref={ ref => { this.refCanvas = ref;} } width={screenWidth} height={screenHeight} style={{ width: screenWidth, height: screenHeight}}>
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
    animationIdx: state.animationIdx,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(FontAnimViewer);