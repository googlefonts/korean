import React, { Component } from 'react'
import { FONTS, BODY_1280, BODY_960, BODY_600, CATEGORIES } from '../constants/defaults';
import { FontViewer } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';
import { connect } from 'react-redux';

const Fragment = React.Fragment;

class FontsList extends Component {
  cutString(msg){
    let { screenWidth } = this.props;
    
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
            return (
              <Fragment key={k}>
                <a name={`category-${k}`} data-category-id={k}></a>
                {
                  _.map(categoryFont.fonts, (fontData, i) => {
                    idx++; 
                    return (
                      <FontViewer key={fontData.id} message={this.cutString(MESSAGES[idx])} {...fontData} />
                    )
                  })
                }
              </Fragment>
            )
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