import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BODY_600, BODY_960 } from '../constants/defaults';
import { GoogleFontBadge } from './';

const Fragment = React.Fragment;

class Footer extends Component {
  render() {
    let { backgroundMode, screenWidth, locale } = this.props;

    return (
      <footer className="footer">
        <div className="footer__flexwrap">
          {
            screenWidth > BODY_960 ? 
            <div className="footer__left">
              <GoogleFontBadge />
            </div> : 
            <GoogleFontBadge />
          }

          <div className="footer__short-desc">
            {
              locale == "ko" ?
              <div className="footer__short-desc-column">
                <h4><span className="inline_en_bold">Google Fonts</span>에 참여하세요.</h4>
                <p>
                  <span className="inline_en">Google Fonts</span>는 전 세계의 디자이너와 함께 웹에서 손쉽게 사용할 수 있는 폰트를 개발합니다. <span className="inline_en">Google Fonts</span>와 이곳에 여러분이 제작한 한글 폰트를 제공하고 싶다면 언제든지 <a href="https://twitter.com/googlefonts" target="_blank"><span className="inline_en">@googlefonts</span></a> 앞으로 알려주세요.
                </p>
                <div className="l-apple-box"></div>
                <p>
                  이 사이트의 소스는 <a href="https://github.com/googlefonts/korean"><span className="inline_en">github.com/googlefonts/korean</span></a>에 공개되어 있습니다. 관련 문의는 이곳에 리포트를 남겨주세요.
                </p>
                <div className="l-apple-box"></div>
                <p >
                  <a href="https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?reserved=1&utm_source=Online&Q_Language=en&utm_medium=own_othr&utm_campaign=Gf-KDS&utm_term=0&utm_content=0&productTag=0&campaignDate=jul19&pType=gprod&referral_code=RL12665"><span style={{fontWeight: 900}}>구글폰트 유저 리서치 프로그램 →</span></a>
                </p>
              </div> :

              <div className="footer__short-desc-column">
                <h4><span className="inline_en_bold">Join Our Community</span></h4>
                <p className="en-regular">
                  We are working with designers around the world to produce best-in-class typeface designs that are made for the web. If you want to offer your own Korean font through Google Fonts, please contact <a href="https://twitter.com/googlefonts" target="_blank">@googlefonts</a>. 
                </p>
                <div className="l-apple-box"></div>
                <p className="en-regular">
                  This website is also open source. To report any issues, please visit <a href="https://github.com/googlefonts/korean">github.com/googlefonts/korean</a>
                </p>

                <div className="l-apple-box"></div>
                <p className="en-regular">
                  <a href="https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?reserved=1&utm_source=Online&Q_Language=en&utm_medium=own_othr&utm_campaign=Gf-KDS&utm_term=0&utm_content=0&productTag=0&campaignDate=jul19&pType=gprod&referral_code=RL12665"><span className="inline_en_bold">Google Fonts user research program →</span></a>
                </p>
              </div> 
            }

          
          </div>
          
          <div className="footer__team">
            <h4><span className="inline_en_bold">Made by Friends of Google Fonts</span></h4>
            <p className="en-regular">
              <a href="http://yang-jang.com" target="_blank">Yang Jang</a><br/>
              <a href="http://eroonkang.com" target="_blank">E Roon Kang</a><br/>
              <a href="http://wonyoung.so" target="_blank">Wonyoung So</a><br/>
              <a href="http://minguhongmfg.com/" target="_blank">Min Guhong Mfg.</a><br/>
              Hannah Son
            </p>
          </div>

          <div className="footer__social">
            <p className="en-regular">
              <a href="https://twitter.com/googlefonts" target="_blank">twitter.com/googlefonts</a><br/>
              <a href="https://github.com/google/fonts" target="_blank">github.com/google/fonts</a>
            </p>
          </div>
        </div>
        {
          screenWidth <= BODY_960 ? 
          <Fragment>
            <div className="l-apple-box--double"></div>
            <div className="l-apple-box--double"></div>
          </Fragment> : null
        }
      </footer>
    )
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode == "black" ? "white" : "black",
    screenWidth: state.screenWidth,
    locale: state.locale
  }
};

export default connect(mapStateToProps)(Footer);
