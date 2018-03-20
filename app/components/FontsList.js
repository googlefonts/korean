import React, { Component } from 'react'
import { FONTS, BODY_480, BODY_1280, BODY_960, BODY_600, CATEGORIES } from '../constants/defaults';
import { FontViewer, FontViewerScript, AnimationScriptSelector } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';

const Fragment = React.Fragment;
const msgScale = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 5.2]);
const msgScaleScript = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 6]);
const MSGS = _.shuffle(MESSAGES);

class FontsList extends Component {
  cutString(msg, category){
    let { screenWidth } = this.props;
    
    if (category === 3) {

      return msg.substring(0, Math.floor(msgScaleScript(screenWidth)));
    } else {
      return msg.substring(0, Math.floor(msgScale(screenWidth)));
    }
  }

  render() {
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
                            <FontViewerScript key={fontData.id} message={this.cutString(MSGS[idx], fontData.category)} {...fontData} />
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
                          <FontViewer key={fontData.id} message={this.cutString(MSGS[idx], fontData.category)} {...fontData} />
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