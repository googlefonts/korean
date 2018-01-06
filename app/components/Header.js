import React, { Component } from 'react'
import { CATEGORIES } from '../constants/defaults';
import { InteractionStatusViewer } from './';
import { connect } from 'react-redux';

class Header extends Component {
  handleToggleLocale(e) {
    console.log("event fired");
    // e.stopPropagation();
  }

  render() {
    let { locale } = this.props;

    return (
      <header className="header">
        <h1>
          구글폰트 + 한국어 얼리 억세스<br/>
          Google Fonts + Korean Early Access
        </h1>

        <div className="header__categories">
          {
            _.map(CATEGORIES, categoryData => {
              return (
                <a className="header__category" key={categoryData.id} href="javascript:void(0);">
                  <div className="header__label-ko">
                    {
                      categoryData.nameKo
                    }
                  </div>
                  <div className="header__label-en">
                    {
                      categoryData.nameEn
                    }
                  </div>
                </a>
              );
            })
          }
        </div>

        <div className="header__description-area">
          {
            locale == "ko" ?
            <div className={`header__description--${locale}`}>
              구글폰트 + 한국어 얼리억세스는 아직 구글폰트에서 지원하지는 않지만 누구나 손쉽게 라이선스의 제약없이 사용할 수 있는 오픈소스 폰트의 목록입니다.
            </div> :
            <div className={`header__description--${locale}`}>
              Google Fonts + Korean Early Access is an experimental showcase for Korean fonts that aren’t yet fully supported.
            </div>
          }
          {
            locale == "ko" ? 
            <div className={`header__menu--${locale}`}>
              <a href="javascript:void(0)" className="">
                한국어 얼리억세스 소개 
              </a>
              <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                English
              </a>
              <InteractionStatusViewer />
            </div> : 
            <div className={`header__menu--${locale}`}>
              <a href="javascript:void(0)" className="">
                Introduction
              </a>
              <a href="javascript:void(0)" className="">
                한국어
              </a> 
              <InteractionStatusViewer/>
            </div>
          }
        </div>

      </header>
    )
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale
  }
};

export default connect(mapStateToProps)(Header);