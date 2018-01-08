import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS } from '../constants/defaults';
import { changeCurrentDescFont } from '../actions';

class DescriptionFontSelector extends Component {
  handleChangeCurrentDescFont(fontData){

    this.props.dispatch(changeCurrentDescFont(fontData.fontName));
  
  }

  render() {
    let { changeCurrentDescFont } = this.props;

    return (
      <div className="font-selector">
        {
          _.map(FONTS, fontData => {
            return (
              <a className={`font-selector${ changeCurrentDescFont === fontData.fontName ? "--selected" : "" }`} key={fontData.id} onClick={this.handleChangeCurrentDescFont.bind(this, fontData)} href="javascript:void(0);" style={{ fontFamily: fontData.fontName }}>
                한
              </a>
            )
          })
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    changeCurrentDescFont: state.currentDescFont
  }
};

export default connect(mapStateToProps)(DescriptionFontSelector);