import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BODY_960 } from '../constants/defaults';

class GoogleFontBadge extends Component {
  render() {
    let { backgroundMode, screenWidth } = this.props;
    let style = {};

    if (screenWidth < BODY_960) {
      style.backgroundColor = backgroundMode;
    }

    return (
      <div className="gf-badge" style={style}>
        <a href="https://fonts.google.com" target="_blank">
          <img src={`./public/assets/made_by_google_fonts_${backgroundMode}.svg`} alt="Made by Google Fonts" />
        </a>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode,
    screenWidth: state.screenWidth
  }
}

export default connect(mapStateToProps)(GoogleFontBadge);
