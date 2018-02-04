import React, { Component } from 'react';
import { FONTS } from '../constants/defaults';
import { connect } from 'react-redux';
import { changeDescFontDropdownOpened, changeCurrentDescFont } from '../actions';
import onClickOutside from "react-onclickoutside";
import _ from 'lodash';

const Fragment = React.Fragment;

class DropDownFontSelectorMenu extends Component {
  handleCurrentDescFont(fontData, e){
    e.stopPropagation();
    let { currentDescFontSelected } = this.props;
    let newCurrentDescFont = {
      ...this.props.currentDescFont
    };

    newCurrentDescFont[currentDescFontSelected] = fontData.id;
    this.props.dispatch(changeCurrentDescFont(newCurrentDescFont));
    this.props.dispatch(changeDescFontDropdownOpened(false));
  }

  handleClickOutside(evt){ 

    evt.stopPropagation();
    _.delay(() => {
      this.props.dispatch(changeDescFontDropdownOpened(false));
    }, 100);

  }

  render() {
    let { currentDescFontSelected, locale } = this.props;
    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont[currentDescFontSelected] == fontData.id });

    return (
      <div className="dropdown-font-selector__menu">
        {
          _.map(FONTS, fontData => {
            return (
              <a className="dropdown-font-selector__list" onClick={this.handleCurrentDescFont.bind(this, fontData)} key={fontData.id} href="javascript:void(0);">
                {
                  locale == "ko" ? 
                  <Fragment>
                    <div className="dropdown-font-selector__list__label-ko-black">
                      {
                        fontData.nameKo
                      }
                    </div>
                    <div className="dropdown-font-selector__list__label-en-regular">
                      {
                        fontData.nameEn
                      }
                    </div> 
                  </Fragment> : 
                  <Fragment>
                    <div className="dropdown-font-selector__list__label-en-black">
                      {
                        fontData.nameEn
                      }
                    </div> 
                    <div className="dropdown-font-selector__list__label-ko-regular">
                      {
                        fontData.nameKo
                      }
                    </div>
                  </Fragment>
                }
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
    currentDescFont: state.currentDescFont,
    locale: state.locale,
    currentDescFontSelected: state.currentDescFontSelected
  }
}
export default connect(mapStateToProps)(onClickOutside(DropDownFontSelectorMenu));