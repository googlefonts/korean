import React, { Component } from 'react'
import { DescriptionFontSelector } from './';
import { BODY_960, BODY_600 } from '../constants/defaults';
import { connect } from 'react-redux';
import RetinaImage from 'react-retina-image';
import { DescriptionKo, DescriptionEn } from './';
import { FONTS } from '../constants/defaults';
import _ from 'lodash';

const Fragment = React.Fragment;

class Description extends Component {

  render() {
    let { screenWidth, headerMode, currentDescFont, locale } = this.props;
    var { currentDescFontSelected } = this.props;

    let headerHeight;

    if (_.isNull(document.querySelector('.font-selector-header'))) {

      headerHeight = 110;

    } else {

      headerHeight = document.querySelector('.font-selector-header').offsetHeight;
    
    }
  

    return (
      <Fragment>
        <a name="description-indicator"></a>
        <section className="description">
          <DescriptionFontSelector />
          {
            headerMode == "black" ?
            <div className="description__header-gutter" style={{ height: headerHeight }}></div> : null  
          }
          
          {
            locale == "ko" ?
            <DescriptionKo /> :
            <DescriptionEn />
          }
        </section>
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale,
    screenWidth: state.screenWidth,
    headerMode: state.headerMode, 
    currentDescFontSelected: state.currentDescFontSelected
  }
}

export default connect(mapStateToProps)(Description);