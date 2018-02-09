import React, { Component } from 'react';
import { connect } from 'react-redux';

class GoogleFontBadge extends Component {
  render() {
    let { backgroundMode } = this.props;

    return (
      <div className="gf-badge">
        <a href="https://fonts.google.com" target="_blank">
          <img src={`./public/assets/made_by_google_fonts_${backgroundMode}.svg`} alt="Made by Google Fonts" />
        </a>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(GoogleFontBadge);
