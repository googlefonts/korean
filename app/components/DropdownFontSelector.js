import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS } from '../constants/defaults';


class DropdownFontSelector extends Component {
  
  render() {
    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont == fontData.id });

    return (
      <a href="javascript:void(0);" className="dropdown-font-selector">
        <div>{ currentDescFont.nameKo }</div> 
        <div>{ currentDescFont.nameEn }</div> 
        <div style={{ marginTop: -2 }}><img src="./public/assets/arrow_down.svg" alt="arrow_down" /></div>
      </a>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont
  }
}

export default connect(mapStateToProps)(DropdownFontSelector);