import React, { Component } from 'react';
import { changeCurrentDescFontSelected } from '../actions';
import { BODY_960, BODY_600 } from '../constants/defaults';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { FONTS } from '../constants/defaults';
import _ from 'lodash';

class DescriptionKo extends Component {

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
          구글폰트 + 한국어 얼리억세스
        </h4>
      
        <p className="description__big" style={fontNames.title}>
          구글폰트 + 한국어 얼리억세스는 아직 구글폰트에서 공식으로 지원하지는 않지만 손쉽게 라이센스의 제약없이 사용 할 수 있는 한국어 오픈소스 웹폰트의 목록입니다.
        </p>
    
        <p style={fontNames.paragraph}>
          구글폰트는 양질의 타이포그래피를 통해서 웹을 보다 아름답고, 빠르며, 참여 가능한 공간으로 만드는 노력을 해오고 있습니다. 보통의 한글폰트는 그 한글조형의 특성상 65,000개 이상의 글리프를 포함하는데, 이것은 약 2,000개 수준의 글리프를 가진 일반 라틴어 계열폰트의 30배에 달합니다. 이 모든 글리프를 포함하는 거대한 한글폰트의 용량은 페이지를 방문 할때 사용중인 폰트를 다운로드 해야하는 웹 환경에서 한글폰트의 사용을 어렵게 합니다.
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

export default connect(mapStateToProps)(DescriptionKo);
