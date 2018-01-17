import React, { Component } from 'react';
import { FONTS } from '../constants/defaults';
import { connect } from 'react-redux';
import { changeDescFontDropdownOpened, changeCurrentDescFont } from '../actions';
import onClickOutside from "react-onclickoutside";
import _ from 'lodash';

class DropDownFontSelectorMenu extends Component {
  handleCurrentDescFont(fontData){
    this.props.dispatch(changeCurrentDescFont(fontData.id));
    this.props.dispatch(changeDescFontDropdownOpened(false));
  }

  handleClickOutside(evt){ 

    _.delay(() => {
      this.props.dispatch(changeDescFontDropdownOpened(false));
    }, 100);

  }

  render() {
    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont == fontData.id });

    return (
      <div className="dropdown-font-selector__menu">
        {
          _.map(FONTS, fontData => {
            return (
              <a className="dropdown-font-selector__list" onClick={this.handleCurrentDescFont.bind(this, fontData)} key={fontData.id} href="javascript:void(0);">
                <div className="dropdown-font-selector__list__label-ko">
                  {
                    fontData.nameKo
                  }
                </div>
                <div className="dropdown-font-selector__list__label-en">
                  {
                    fontData.nameEn
                  }
                </div>
              </a>
            );
          })
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont
  }
}
export default connect(mapStateToProps)(onClickOutside(DropDownFontSelectorMenu));