import React, { Component } from 'react'
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    let { backgroundMode } = this.props;

    return (
      <footer className={`footer--${backgroundMode}`}>
        <a className="footer__google-fonts" href="https://fonts.google.com" target="_blank">
          <img src={`./public/assets/made_by_google_fonts_${backgroundMode}.svg`} alt="Made by Friends of Google Fonts" />
        </a>
        <div className="footer__short-desc">
          <div className="footer__short-desc-column">
            구글폰트에 참여하기<br/><br/>
          
            구글폰트는 전세계의 디자이너들과 협업하며 웹에서 손쉽게 사용할 수 있는 폰트들을 개발합니다.<br/><br/>
          </div>

          <a href="javascript:void(0);">API Documentation</a><br/>
          <a href="javascript:void(0);">Github</a><br/>
          <a href="javascript:void(0);">Early Access</a>
      
        </div>
        
        <div className="footer__team">
          Made by Friends of Google Fonts<br/><br/>

          Dave Crossland<br/>
          Irin Kim<br/>
          Suyoung Jang<br/>
          E Roon Kang<br/>
          Wonyoung So
        </div>

        <div className="footer__social">
          @ googlefonts on Twitter<br/>
          @ googlefonts on GitHub
        </div>

      </footer>
    )
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode
  }
};

export default connect(mapStateToProps)(Footer);