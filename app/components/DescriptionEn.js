import React, { Component } from 'react';
import { changeCurrentDescFontSelected } from '../actions';
import { BODY_960, BODY_600 } from '../constants/defaults';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { FONTS } from '../constants/defaults';
import _ from 'lodash';

class DescriptionEn extends Component {

  handleCurrentDescFontSelected(name, e) {
    e.stopPropagation();
    this.props.dispatch(changeCurrentDescFontSelected(name));
  }

  retrieveFontName(currentDescFont) {
    var result = {};

    _.each(currentDescFont, (v, k) => {
      let font = _.find(FONTS, fontData => { return v == fontData.id });
      
      result[k] = {
        fontFamily: font.fontName
      };

    });

    return result;
  }

  render() {
    let { currentDescFontSelected, currentDescFont, screenWidth } = this.props;
    let marginRightScale = scaleLinear().domain([960, 1280]).clamp(true).range([20, 150]);
    let selectedOrNot = (areaName) => {
      return areaName == currentDescFontSelected ? "marching-ants" : "";
    }

    let fontNames = this.retrieveFontName(currentDescFont);

    return (
      <div className="description__container">
        <h4 style={fontNames.title}>
          Google Fonts + Korean Early Access
        </h4>
        
        <p style={fontNames.paragraph}>
          Google Fonts + Korean Early Access is a list of Korean open source web fonts that are not yet officially supported in Google's fonts but can be easily used without license restrictions.
        </p>


      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    currentDescFont: state.currentDescFont,
    locale: state.locale,
    currentDescFontSelected: state.currentDescFontSelected
  }
};

export default connect(mapStateToProps)(DescriptionEn);
