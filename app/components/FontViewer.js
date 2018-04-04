import React, { Component } from 'react'
import * as opentype from 'opentype.js'
import { changeCurrentDetailSelected } from '../actions';
import { BODY_480 } from '../constants/defaults';
import { FontOutlineViewer, FontPreviewTyper, FontAnimViewer, FontDetailViewer } from './';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import _ from 'lodash';

const Fragment = React.Fragment;
const heightScale = scaleLinear().domain([320, 425, 768, 2560]).clamp(true).range([320, 420, 350, 550]);
const sizeScale = scaleLinear().domain([320, 425, 768, 2560]).clamp(true).range([270, 370, 300, 500]);

class FontViewer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false,
      font: null,
      fontWeightSelected: null,
      hovered: false
    }
  }

  componentDidMount(){
    
    opentype.load(this.props.fontUrl, (err, font) => {
      
      if (err) {

        console.log(err);

      } else {
        this.setState({
          loaded: true,
          font: font,
          fontWeightSelected: !_.isNull(_.last(this.props.weights).fontWeight) ? _.last(this.props.weights).fontWeight : 400
        });
      
      }

    });


  }

  handleWeightSelectedClick(weightData, e){
    e.stopPropagation();
    this.setState({
      fontWeightSelected: weightData.fontWeight
    });
  }

  handleClosed(e){
    e.stopPropagation();
    this.props.dispatch(changeCurrentDetailSelected(null)); 
  }

  handleDetailSelectedClick(e){
    e.stopPropagation();
    
    this.setState({
      hovered: false
    })

    if (this.props.id === this.props.currentDetailSelected) {
      this.props.dispatch(changeCurrentDetailSelected(null));
    } else {
      this.props.dispatch(changeCurrentDetailSelected(this.props.id)); 
    }
  }

  handleMouseEnter(e){
    this.setState({
      hovered: true
    });
  }

  handleMouseLeave(e){
    this.setState({
      hovered: false
    })
  }

  render() {
    let { currentViewFont, screenWidth, locale, backgroundMode, currentDetailSelected } = this.props;
    let selected = currentViewFont == this.props.id;
    let detailSelected = currentDetailSelected == this.props.id;
    let { hovered } = this.state;
    let leftWidthScale = scaleLinear().domain([600, 1440]).clamp(true).range([105, 210]);
    console.log(this.props.nameKo, this.props.isVisible);

    return (
      <div className={`font-viewer${ selected ? " font-viewer--selected" : "" }`} data-id={this.props.id}>
        <div className="font-viewer__flex-wrapper--top">
          <div className="font-viewer__left" style={{ minWidth: leftWidthScale(screenWidth) }}>
            {
              locale == "ko" ? 
              <h3 style={{ opacity: hovered ? 0.5 : 1 }} onMouseEnter={this.handleMouseEnter.bind(this)} onTouchCancel={this.handleMouseLeave.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.handleDetailSelectedClick.bind(this)}>
                <span className="ko">{ this.props.nameKo }</span>

                {
                  screenWidth > BODY_480 ?
                  <br/> : 
                  <Fragment>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                  </Fragment>
                }
                <div className="l-apple-box--quarter"></div>
                <span className="en-black">{ this.props.nameEn }</span>
              </h3> : 
              <h3 style={{ opacity: hovered ? 0.5 : 1 }} onMouseEnter={this.handleMouseEnter.bind(this)} onTouchCancel={this.handleMouseLeave.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.handleDetailSelectedClick.bind(this)}>
                <span className="en-black">{ this.props.nameEn }</span>

                {
                  screenWidth > BODY_480 ?
                  <br/> : 
                  <Fragment>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                  </Fragment>
                }
                <div className="l-apple-box--quarter"></div>
                <span className="ko">{ this.props.nameKo }</span>
              </h3>
            }

            <div className="font-viewer__weight-area">
              {
                !detailSelected ? 
                <a href="javascript:void(0);" style={{ opacity: hovered ? 0.5 : 1 }} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.handleDetailSelectedClick.bind(this)}>
                  <img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" />
                </a>
                :
                <ul className="font-viewer__weights">
                  {
                    _.map(this.props.weights, weightData => {
                      return (
                        <li key={weightData.fontWeight}>
                          <a href="javascript:void(0);" className={`${ weightData.fontWeight == this.state.fontWeightSelected ?  "selected" : "" }`} onClick={this.handleWeightSelectedClick.bind(this, weightData)}>
                            { weightData.weightName }
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
              }
            </div>
          </div>

          {
            this.state.loaded && this.props.isVisible ? 
              ( 
                detailSelected ?
                <FontPreviewTyper {...this.props}  size={sizeScale(screenWidth)} containerHeight={heightScale(screenWidth)} fontWeightSelected={this.state.fontWeightSelected} />
                : 
                (
                  selected ? 
                  <FontAnimViewer fontSize={this.props.fontSize} letterSpacing={this.props.letterSpacing} baseline={this.props.baseline} containerHeight={heightScale(screenWidth)} size={sizeScale(screenWidth)} id={ `${this.props.fontName}--anim` } message={this.props.message} font={ this.state.font } /> :
                  <FontOutlineViewer fontSize={this.props.fontSize} letterSpacing={this.props.letterSpacing} baseline={this.props.baseline} containerHeight={heightScale(screenWidth)} size={sizeScale(screenWidth)} id={ this.props.fontName } message={this.props.message} font={ this.state.font } />
                )
              ) :
              <div style={{width: '100%', maxWidth: '800px', height: heightScale(screenWidth), display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="linear-activity">
                  <div className="indeterminate"></div>
                </div>
              </div>           
          }
         
        </div>


        {
          detailSelected ? 
          <div className="font-viewer__flex-wrapper--bt">
            <FontDetailViewer {...this.props} handleClosed={this.handleClosed.bind(this)} />
          </div> : null
        }
      </div>
      
      
    )
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode,
    currentViewFont: state.currentViewFont,
    screenWidth: state.screenWidth,
    currentDetailSelected: state.currentDetailSelected,
    locale: state.locale
  }
};

export default connect(mapStateToProps)(FontViewer);