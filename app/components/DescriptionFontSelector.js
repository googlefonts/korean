import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS, BODY_600 } from '../constants/defaults';
import { changeCurrentDescFont } from '../actions';
import { DropdownFontSelector } from './';

const Fragment = React.Fragment;

class DescriptionFontSelector extends Component {
  handleChangeCurrentDescFont(fontData){

    let { currentDescFontSelected } = this.props;
    let newCurrentDescFont = {
      ...this.props.currentDescFont
    };

    newCurrentDescFont[currentDescFontSelected] = fontData.id;
    this.props.dispatch(changeCurrentDescFont(newCurrentDescFont));

  }

  render() {
    let { screenWidth, headerMode, currentDescFontSelected } = this.props;
    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont[currentDescFontSelected] == fontData.id });

    return (
      <div className={`font-selector-header ${headerMode == "black" ? "black" : ""}`}>
        {
          screenWidth > BODY_600 ? 
          <div className="font-selector-area">
            {
              _.map(FONTS, fontData => {
                return (
                  <a className={`font-selector${ currentDescFont.id === fontData.id ? "--selected" : "" }`} key={fontData.id} onClick={this.handleChangeCurrentDescFont.bind(this, fontData)} href="javascript:void(0);" style={{ fontFamily: fontData.fontName }}>
                    한
                  </a>
                )
              })
            }
          </div> : null 
        }

        {
          screenWidth > BODY_600 ?  
          <DropdownFontSelector /> :
          <div className="font-selector-area--mobile">
            <DropdownFontSelector />
            <div className="font-selector--selected-mobile" href="javascript:void(0);" style={{ fontFamily: currentDescFont.fontName }}>
              한
            </div>
            
          </div>

        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont,
    screenWidth: state.screenWidth,
    headerMode: state.headerMode,
    currentDescFontSelected: state.currentDescFontSelected
  }
};

export default connect(mapStateToProps)(DescriptionFontSelector);