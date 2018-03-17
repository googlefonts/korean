import React, { Component } from 'react';
import { scaleLinear } from 'd3';
const Fragment = React.Fragment;
import { connect } from 'react-redux';

class FontDetailViewer extends Component {
  constructor(props){
    super(props);

    this.state = {
      weightSelected: []
    };
  }

  componentDidMount(){
    this.setState({
      weightSelected: this.setWeightList(this.state.weightSelected, _.first(this.props.weights))
    });    
  }

  componentWillReceiveProps(newProps){

  }

  handleWeightToggle(weightData, e){
    e.stopPropagation();
    this.setState({
      weightSelected: this.setWeightList(this.state.weightSelected, weightData) 
    });    
  }

  handleFocus(e){
    // debugger;
    e.stopPropagation(e);
  }

  setWeightList(list, data) {
    let newList = [...list];


    let isInclude = _.findIndex(newList, l => { return l.fontWeight == data.fontWeight; }) > -1;

    if (isInclude) {
      
      if (newList.length > 1) {
        _.remove(newList, l => {
          return l.fontWeight == data.fontWeight;
        })  
      }
      

    } else {

      newList.push(data);

    }


    return newList;
  }

  createCSSURL(type, weights){
    let { fontName } = this.props;
    if (type == 0) {  

      return `<link href="https://fonts.googleapis.com/css?family=${fontName.replace(/ /g, "+")}:${ weights.join(',')}" rel="stylesheet">`;

    } else {

      return `@import url('https://fonts.googleapis.com/css?family=${fontName.replace(/ /g, "+")}:${ weights.join(',')}')`;

    }
  }

  render() {
    let { screenWidth, locale, category, backgroundMode } = this.props;
    let { weightSelected } = this.state;
    let weights = _.map(weightSelected, w => { return w.fontWeight; }).sort();
    let leftWidthScale;
    let addClassName = "";

    if (category === 3) {
      addClassName = "--script"
      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
    } else {
      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 210]);
    }


    return (
      <Fragment>
        <div className="font-viewer__detail-left" style={{ minWidth: leftWidthScale(screenWidth) }}>
          <a href="javascript:void(0);" onClick={this.props.handleClosed}>
            <img src={`./public/assets/close_detail_${backgroundMode}.svg`} alt="arrow_close" />
          </a>

        </div>
        <div className={`font-viewer__detail-right${addClassName}`}>
          {
            locale == "ko" ?

            <div className={`font-viewer__column-left${addClassName}`}>
              <p>
                { this.props.descriptionKo }
              </p>
              <div className="l-apple-box"></div>
              <p>
                제작 <span className="bold">{ this.props.foundryKo }</span>
              </p>
            </div> : 

            <div className={`font-viewer__column-left${addClassName}`}>
              <p className="en-regular">
                { this.props.descriptionEn }
              </p>
              <div className="l-apple-box"></div>
              <p className="en-regular">
                Type Foundry <span className="en-black">{ this.props.foundryEn }</span>
              </p>
            </div>
          }

          <div className={`font-viewer__column-right${addClassName}`}>
            <div className="font-viewer__input-area">
              <div className="font-viewer__detail-label">
                HTML
              </div>
              <div className="font-viewer__detail-content">
                <input type="text" className="font-viewer__copy-input" onClick={this.handleFocus.bind(this)} onFocus={this.handleFocus.bind(this)} readOnly value={ this.createCSSURL(0, weights) } />
              </div>
            </div>

            <div className="font-viewer__input-area">
              <div className="font-viewer__detail-label">
                CSS
              </div>
              <div className="font-viewer__detail-content">
                <input type="text" className="font-viewer__copy-input" onClick={this.handleFocus.bind(this)} onFocus={this.handleFocus.bind(this)} readOnly value={ this.createCSSURL(1, weights) } />
              </div>
            </div>

            <div className="font-viewer__input-area">
              <div className="font-viewer__detail-label--ko">
                {
                  locale == "ko" ?
                  "굵기추가" : "Weights"
                }
              </div>
              <div className="font-viewer__detail-content">
                {
                  _.map(this.props.weights, weightData => {

                    let selected = _.findIndex(this.state.weightSelected, l => { return l.fontWeight == weightData.fontWeight; }) > -1;

                    return (
                      <a className={`font-viewer__weight-link${ selected ? "--selected" : ""}`} href="javascript:void(0);" key={weightData.fontWeight} onClick={this.handleWeightToggle.bind(this, weightData)}>
                        { weightData.weightName }
                      </a>
                    )
                  })
                }
              </div>
            </div>

          </div>

        </div>
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    locale: state.locale,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(FontDetailViewer);