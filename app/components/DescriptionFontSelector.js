import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS } from '../constants/defaults';
import { changeCurrentDescFont } from '../actions';
import { DropdownFontSelector } from './';

const Fragment = React.Fragment;

class DescriptionFontSelector extends Component {
  handleChangeCurrentDescFont(fontData){

    this.props.dispatch(changeCurrentDescFont(fontData.id));
  
  }

  render() {
    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont == fontData.id });

    return (
      <Fragment>
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
        </div>
        <DropdownFontSelector />
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont
  }
};

export default connect(mapStateToProps)(DescriptionFontSelector);