import React, { Component } from 'react'
import * as opentype from 'opentype.js'
import { changeCurrentScriptViewFont, changeCurrentViewFont } from '../actions';
import { BODY_480 } from '../constants/defaults';
import { FontAnimScriptViewer, FontOutlineViewer, FontPreviewTyper, FontAnimViewer, FontDetailViewer } from './';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import _ from 'lodash';

const Fragment = React.Fragment;

class FontViewerScript extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false,
      font: null,
      detailSelected: false,
      fontWeightSelected: null
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
          fontWeightSelected: !_.isNull(_.first(this.props.weights).fontWeight) ? _.first(this.props.weights).fontWeight : 400
        });
      
      }

    });


  }

  handleDetailSelectedClick(e){
    this.setState({
      detailSelected: true
    });
  }

  handleWeightSelectedClick(weightData){
    this.setState({
      fontWeightSelected: weightData.fontWeight
    });
  }

  handleClosed(e){
    this.setState({
      detailSelected: false
    }) 
  }

  handleMouseEnter(e){
    this.props.dispatch(changeCurrentViewFont(null));
    this.props.dispatch(changeCurrentScriptViewFont(this.props.id));
  }

  handleMouseLeave(e){
    this.props.dispatch(changeCurrentScriptViewFont(null));
  }

  render() {
    let { currentScriptViewFont, screenWidth, locale } = this.props;
    let selected = currentScriptViewFont == this.props.id;
    let { detailSelected } = this.state;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);


    return (
      <div onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className={`font-viewer${ selected ? "--script-selected" : "--script" }`} data-id={this.props.id}>
        <div className="font-viewer__flex-wrapper--top">
          <div className="font-viewer__left--script" style={{ minWidth: leftWidthScale(screenWidth) }}>
            {
              locale == "ko" ? 
              <h3>
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
                <span className="en-black">{ this.props.nameEn }</span>
              </h3> : 
              <h3>
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

                <span className="ko">{ this.props.nameKo }</span>
              </h3>
            }

            <div className="font-viewer__weight-area">
              {
                !detailSelected ? 
                <a href="javascript:void(0);" onClick={this.handleDetailSelectedClick.bind(this)}>
                  <img src="./public/assets/arrow_down.svg" alt="arrow_down" />
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
            this.state.loaded ? 
              ( 
                detailSelected ?
                <FontPreviewTyper {...this.props} fontWeightSelected={this.state.fontWeightSelected} />
                : 
                (
                  selected ? 
                  <FontAnimScriptViewer id={ `${this.props.fontName}--anim` } message={this.props.message} font={ this.state.font } /> :
                  <FontOutlineViewer category={this.props.category} id={ this.props.fontName } message={this.props.message} font={ this.state.font } />
                )
              ) :
              <div>
                loading...
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
    currentScriptViewFont: state.currentScriptViewFont,
    screenWidth: state.screenWidth,
    locale: state.locale
  }
};

export default connect(mapStateToProps)(FontViewerScript);