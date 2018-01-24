import React, { Component } from 'react'
import { CATEGORIES, BODY_600 } from '../constants/defaults';
import { connect } from 'react-redux';
import { AnimationSelector } from './';
import { changeLocale, changeCurrentCategory, changeHeaderHeight } from '../actions';

const Fragment = React.Fragment;

class Header extends Component {
  componentDidMount(){
    this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
  }
  
  componentWillReceiveProps(newProps){
    if (this.props.screenWidth != newProps.screenWidth) {
      this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
    }
  }

  handleToggleLocale(e) {
    this.props.dispatch(changeLocale(this.props.locale === "ko" ? "en" : "ko"));
  }

  handleCurrentCategory(categoryData){
    this.props.dispatch(changeCurrentCategory(categoryData.id));
  }

  render() {
    let { locale, currentCategory, screenWidth } = this.props;

    return (
      <header className="header" ref={ ref => { this.refHeader = ref; }}>
        <div className="header__left">
          <div className="header__title">
            {
              locale == "ko" ?
              <h1>
                구글폰트 + 한국어 얼리억세스<br/>
                <span className="en-black">Google Fonts + Korean Early Access</span>
              </h1> :
              <h1>
                <span className="en-black">Google Fonts + Korean Early Access</span><br/>
                구글폰트 + 한국어 얼리억세스
              </h1>
            }
            { 
              screenWidth > BODY_600 ? 
              <Fragment>
                <div className="l-apple-box--half"></div>
                <AnimationSelector />
              </Fragment> : null
            }
          </div>

          <div className="header__categories">
            {
              _.map(CATEGORIES, categoryData => {
                return (
                  <a className={`category-selector${ categoryData.id === currentCategory ? "--selected" : ""}`} onClick={this.handleCurrentCategory.bind(this, categoryData)} key={categoryData.id} href="javascript:void(0);">

                    {
                      locale == "ko" ?
                      <Fragment>
                        <div className="category-selector__label-ko-left">
                          {
                            categoryData.nameKo
                          }
                        </div>
                        <div className="category-selector__label-en-right">
                          {
                            categoryData.nameEn
                          }
                        </div>
                      </Fragment> : 
                      <Fragment>
                        <div className="category-selector__label-en-left">
                          {
                            categoryData.nameEn
                          }
                        </div>                         
                        <div className="category-selector__label-ko-right">
                          {
                            categoryData.nameKo
                          }
                        </div>
                      </Fragment>
                    }
                  </a>
                );
              })
            }
          </div>
        </div>

        <div className="header__description-area">
          {
            locale == "ko" ?
            <div className={`header__description--${locale}`}>
              구글폰트 + 한국어 얼리억세스는 다양한 한글폰트를 온라인에서 보다 가볍고 손쉽게 사용할 수 있도록 실험적으로 마련된 한국어 오픈소스 웹폰트의 목록입니다.
            </div> :
            <div className={`header__description--${locale}`}>
              Google Fonts + Korean Early Access is an experimental showcase for Korean fonts that aren’t yet fully supported.
            </div>
          }
          {
            locale == "ko" ? 
            <div className={`header__menu--${locale}`}>
              <div>
                <a href="javascript:void(0)" className="">
                  한국어 얼리억세스 소개 
                </a>
                <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="en-black">
                  English
                </a>
              </div>
              { 
                screenWidth <= BODY_600 ? 
                <AnimationSelector />
                : null
              }
            </div> : 
            <div className={`header__menu--${locale}`}>
              <div>
                <a href="javascript:void(0)" className="en-black">
                  Introduction
                </a>
                <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                  한국어
                </a> 
              </div>
              { 
                screenWidth <= BODY_600 ? 
                <AnimationSelector />
                : null
              }
            </div>
          }
        </div>

        
        <a href="javascript:void(0);" className="header__hamburger">
          <img src="./public/assets/hamburger.svg" alt="menu" />
        </a>
      </header>
    )
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale,
    currentCategory: state.currentCategory,
    screenWidth: state.screenWidth
  }
};

export default connect(mapStateToProps)(Header);