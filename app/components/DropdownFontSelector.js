import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS } from '../constants/defaults';
import { changeDescFontDropdownOpened } from '../actions';
import { getCurrentDescFont } from '../utils';

const Fragment = React.Fragment;

class DropdownFontSelector extends Component {
  
  handleDropdownClick(e){
    e.stopPropagation();
    if (!this.props.descFontDropdownOpened) {
      this.props.dispatch(changeDescFontDropdownOpened(true));
    }
  }

  render() {
    let { currentDescFontSelected, locale, backgroundMode } = this.props;

    let currentDescFont = getCurrentDescFont(this.props.currentDescFont, currentDescFontSelected);


    return (
      <div className="dropdown-font-selector">
        <a href="javascript:void(0);" onClick={this.handleDropdownClick.bind(this)} className="dropdown-font-selector__selected">
          {
            locale == "ko" ? 
            <Fragment>
              <div className="dropdown-font-selector__ko">{ currentDescFont.nameKo }</div> 
              <div className="dropdown-font-selector__en en-regular">{ currentDescFont.nameEn }</div> 
              <div style={{ marginTop: -2 }}><img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" /></div>
            </Fragment> :
            <Fragment>
              <div className="dropdown-font-selector__en en-black">{ currentDescFont.nameEn }</div> 
              <div className="dropdown-font-selector__ko">{ currentDescFont.nameKo }</div> 
              <div style={{ marginTop: -2 }}><img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" /></div>
            </Fragment>
          }
        </a>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont,
    backgroundMode: state.backgroundMode == "black" ? "white" : "black",
    locale: state.locale,
    currentDescFontSelected: state.currentDescFontSelected
  }
}

export default connect(mapStateToProps)(DropdownFontSelector);