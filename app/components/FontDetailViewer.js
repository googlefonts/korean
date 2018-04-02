import React, { Component } from 'react';
import { scaleLinear } from 'd3';
const Fragment = React.Fragment;
import { connect } from 'react-redux';
import { FOUNDRIES } from '../constants/defaults';

class FontDetailViewer extends Component {
  constructor(props){
    super(props);

    this.state = {
      weightSelected: [],
      weightClicked: false
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
      weightSelected: this.setWeightList(this.state.weightSelected, weightData),
      weightClicked: true
    });    

    _.delay( () => {
      this.setState({
        weightClicked: false
      });
    }, 400);

  }

  handleFocus(e){
    // debugger;
    e.stopPropagation(e);
    e.target.select();
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

  getFoundriesTitle(foundries){
    return {
      ko: `${_.map(foundries, f => { return FOUNDRIES[f].titleKo; }).join(', ')}`,
      en: `${_.map(foundries, f => { return FOUNDRIES[f].titleEn; }).join(', ')}`
    }
  }

  getFoundriesDesc(foundries){
    
    return {
      ko: _.map(foundries, (f, i) => { 
          return (
            <p key={i}>
              { FOUNDRIES[f].ko }
            </p>
          );
        }),
      en: _.map(foundries, (f, i) => { 
          return (
            <p key={i} className="en-regular">
              { FOUNDRIES[f].en }
            </p>
          );
        })  
      
    };
  }

  render() {
    let { screenWidth, locale, category, backgroundMode } = this.props;
    let { weightSelected, weightClicked } = this.state;
    let weights = _.map(weightSelected, w => { return w.fontWeight; }).sort();
    let leftWidthScale;
    let addClassName = "";

    if (category === 3) {
      addClassName = "--script"
      leftWidthScale = scaleLinear().domain([360, 1440]).clamp(true).range([40, 105]);
    } else {
      leftWidthScale = scaleLinear().domain([360, 1440]).clamp(true).range([40, 210]);
    }

    let foundryTitles = this.getFoundriesTitle(this.props.foundries);
    let foundryDescs = this.getFoundriesDesc(this.props.foundries);
    // debugger;
    return (
      <Fragment>
        <div className="font-viewer__detail-left" style={{ minWidth: leftWidthScale(screenWidth) }}>
          <a href="javascript:void(0);" onClick={this.props.handleClosed} className="close">
            <img src={`./public/assets/close_detail_${backgroundMode}.svg`} alt="arrow_close" />
          </a>

        </div>
        <div className={`font-viewer__detail-right${addClassName}`}>
          {
            locale == "ko" ?

            <div className={`font-viewer__column-left${addClassName}`}>
              <p className="font-description">
                { this.props.descriptionKo }
              </p>
              <p>
                제작&nbsp;&nbsp;&nbsp;<span className="bold">{ foundryTitles.ko }</span>
              </p>
              { foundryDescs.ko }
            </div> : 

            <div className={`font-viewer__column-left${addClassName}`}>
              <p className="en-black">
                { this.props.descriptionEn }
              </p>
              <p className="en-regular">
                Foundry&nbsp;&nbsp;&nbsp;<span className="en-black">{ foundryTitles.en }</span>
              </p>
              { foundryDescs.en }
            </div>
          }

          <div className={`font-viewer__column-right${addClassName}`}>
            <div className="font-viewer__input-area">
              <div className="font-viewer__detail-label">
                HTML
              </div>
              <div className="font-viewer__detail-content">
                <input type="text" className={`font-viewer__copy-input ${weightClicked ? 'c-blink' : ''}`} onClick={this.handleFocus.bind(this)} onFocus={this.handleFocus.bind(this)} readOnly value={ this.createCSSURL(0, weights) } />
              </div>
            </div>

            <div className="font-viewer__input-area tight">
              <div className="font-viewer__detail-label">
                CSS
              </div>
              <div className="font-viewer__detail-content">
                <input type="text" className={`font-viewer__copy-input ${weightClicked ? 'c-blink' : ''}`} onClick={this.handleFocus.bind(this)} onFocus={this.handleFocus.bind(this)} readOnly value={ this.createCSSURL(1, weights) } />
              </div>
            </div>

            <div className="font-viewer__input-area">
              <div className="font-viewer__detail-label--ko">
                {
                  locale == "ko" ?
                  "굵기선택" : <span className='en-black'>Weights</span>
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