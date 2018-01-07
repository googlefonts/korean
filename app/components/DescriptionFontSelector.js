import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS } from '../constants/defaults';

class DescriptionFontSelector extends Component {
  render() {
    return (
      <div className="description-font-selector">
        {
          _.map(FONTS, fontData => {
            return (
              <a key={fontData.id} href="javascript:void(0);" style={{ fontFamily: fontData.fontName }}>
                한
              </a>
            )
          })
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {

  }
};

export default connect(mapStateToProps)(DescriptionFontSelector);