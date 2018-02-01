import React, { Component } from 'react'
import { FONTS, BODY_480, BODY_1280, BODY_960, BODY_600, CATEGORIES } from '../constants/defaults';
import { FontViewer, FontViewerScript, AnimationScriptSelector } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';
import { connect } from 'react-redux';

const Fragment = React.Fragment;

class FontsList extends Component {
  cutString(msg, category){
    let { screenWidth } = this.props;
    
    if (category === 3) {

      if (screenWidth < BODY_480) {
        return msg[0];
      } else if (screenWidth >= BODY_480 && screenWidth < BODY_600) {
        return msg.substring(0, 3);
      } else if (screenWidth >= BODY_600 && screenWidth < BODY_960) {
        return msg.substring(0, 2);
      } else if (screenWidth >= BODY_960 && screenWidth < BODY_1280) {
        return msg.substring(0, 3);
      } else {
        return msg;
      }

    } else {

      if (screenWidth < BODY_600) {
        return msg[0];
      } else if (screenWidth >= BODY_600 && screenWidth < BODY_960) {
        return msg.substring(0, 2);
      } else if (screenWidth >= BODY_960 && screenWidth < BODY_1280) {
        return msg.substring(0, 3);
      } else {
        return msg;
      }
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
                  <a name={`category-${k}`} data-category-id={k}></a>
                  <AnimationScriptSelector />
                  <div className="font-script-list">
                    {
                      _.map(categoryFont.fonts, (fontData, i) => {
                        idx++; 
                        return (
                          <FontViewerScript key={fontData.id} message={this.cutString(MESSAGES[idx], fontData.category)} {...fontData} />
                        )
                      })
                    }
                  </div>
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
                        <FontViewer key={fontData.id} message={this.cutString(MESSAGES[idx], fontData.category)} {...fontData} />
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