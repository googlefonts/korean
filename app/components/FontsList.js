import React, { Component } from 'react'
import { FONTS, BODY_480, BODY_1280, BODY_960, BODY_600, CATEGORIES } from '../constants/defaults';
import { FontViewer, FontViewerScript, AnimationScriptSelector } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { cutString } from '../utils';

const Fragment = React.Fragment;
const msgScale = cutString;
const msgScaleScript = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 6]);
const SELECTED_MSGS = _.first(_.shuffle(MESSAGES));

class FontsList extends Component {
  constructor(props){

    super(props);
    this.state = {
      len: Math.floor(msgScale(window.innerWidth)),
      scriptLen: Math.floor(msgScaleScript(window.innerWidth))
    };

  }
  
  componentDidMount(){
    this.updateLen(this.props.screenWidth);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.screenWidth != this.props.screenWidth) { 
      this.updateLen(newProps.screenWidth);
    }
  }

  filterString(len, scriptLen){
    var big = _.shuffle(_.filter(SELECTED_MSGS, msg => {
        return msg[1] === len;
      }));

    var script = _.shuffle(_.filter(SELECTED_MSGS, msg => {
      return msg[1] === scriptLen;
    }));

    if (big.length === 0){
      big = _.shuffle(_.map(SELECTED_MSGS, msg => {
        return [msg[0].substring(0, len), 1];
      }));

    }

    if (script.length === 0) {
      script = _.shuffle(_.map(SELECTED_MSGS, msg => {
        return [msg[0].substring(0, scriptLen), 1];
      }));
    }

    return {
      big: big,
      script: script
    }
  }

  updateLen(screenWidth){
    this.setState({
      len: Math.floor(msgScale(screenWidth)),
      scriptLen: Math.floor(msgScaleScript(screenWidth))
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.len != this.state.len ||
           nextState.scriptLen != this.state.scriptLen;
  }

  render() {
    let { screenWidth } = this.props;
    let { len, scriptLen } = this.state;


    let filteredMsgs = this.filterString(len, scriptLen);
    // debugger;
    console.log("big", filteredMsgs.big);
    console.log("script", filteredMsgs.script);
    
    var categoryFonts = {};

    _.each(CATEGORIES, categoryData => {

      var fonts = _.filter(FONTS, fontData => { return fontData.category == categoryData.id });
      let category = {
        ...categoryData,
        fonts: fonts
      };

      categoryFonts[categoryData.id] = category;
      // debugger;
    });

    var idx = -1;

    return (
      <section className="fonts-list">
        {
          _.map(categoryFonts, (categoryFont, k) => {
            if (k == 3) {

              return (
                <Fragment key={k}>
                  <section className="font-script-container">
                    <a name={`category-${k}`} data-category-id={k}></a>
                    <div className="font-script-list">
                      {
                        _.map(categoryFont.fonts, (fontData, i) => {
                          idx++; 
                          return (
                            <FontViewerScript key={fontData.id} message={filteredMsgs.script[i % filteredMsgs.script.length][0]} {...fontData} />
                          )
                        })
                      }
                    </div>
                  </section>
                </Fragment>
              );

            } else {

              return (
                <Fragment key={k}>
                    <a name={`category-${k}`} data-category-id={k}></a>
                    {
                      _.map(categoryFont.fonts, (fontData, i) => {
                        idx++; 
                        return (
                          <FontViewer key={fontData.id} message={filteredMsgs.big[i % filteredMsgs.big.length][0]} {...fontData} />
                        )
                      })
                    }
                </Fragment>
              );

            }
          }) 
        }
      </section>
    )
  }
}

let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth
  };
}
export default connect(mapStateToProps)(FontsList);