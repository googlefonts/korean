import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS } from '../constants/defaults';
import { changeDescFontDropdownOpened } from '../actions';
import { DropdownFontSelectorMenu } from './';

class DropdownFontSelector extends Component {
  
  handleDropdownClick(e){
    if (!this.props.descFontDropdownOpened) {
      this.props.dispatch(changeDescFontDropdownOpened(true));
    }
  }

  render() {
    let { descFontDropdownOpened, currentDescFontSelected } = this.props;

    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont[currentDescFontSelected] == fontData.id });

    return (
      <div className="dropdown-font-selector">
        <a href="javascript:void(0);" onClick={this.handleDropdownClick.bind(this)} className="dropdown-font-selector__selected">
          <div>{ currentDescFont.nameKo }</div> 
          <div className="en-regular">{ currentDescFont.nameEn }</div> 
          <div style={{ marginTop: -2 }}><img src="./public/assets/arrow_down_white.svg" alt="arrow_down" /></div>
        </a>
        {
          descFontDropdownOpened ? 
          <DropdownFontSelectorMenu /> : null  
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont,
    descFontDropdownOpened: state.descFontDropdownOpened,
    currentDescFontSelected: state.currentDescFontSelected
  }
}

export default connect(mapStateToProps)(DropdownFontSelector);