import React, { Component } from 'react'
import { FONTS, BODY_1280, BODY_960, BODY_600 } from '../constants/defaults';
import { FontViewer } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';
import { connect } from 'react-redux';

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
    return (
      <section className="fonts-list">
        {
          _.map(FONTS, (fontData, i) => {
            return (
              <FontViewer key={fontData.id} message={this.cutString(MESSAGES[i])} {...fontData} />
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