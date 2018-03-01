import React, { Component } from 'react'
import { CATEGORIES, BODY_600, BODY_960 } from '../constants/defaults';
import { connect } from 'react-redux';
import { AnimationSelector, HeaderCategories } from './';
import { changeLocale, changeCurrentCategory, changeHeaderHeight } from '../actions';

const Fragment = React.Fragment;

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  componentDidMount(){
    this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
  }
  
  componentWillReceiveProps(newProps){
    if (this.props.screenWidth != newProps.screenWidth) {
      this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
      // this.setState({
      //   isMenuOpen: false
      // });
    }
  }

  handleToggleLocale(e) {
    e.stopPropagation();
    this.props.dispatch(changeLocale(this.props.locale === "ko" ? "en" : "ko"));
  }

  handleMenuOpen(e){
    e.stopPropagation(e);
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    _.delay(() => {

      this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));

    }, 10);
  }

  render() {
    let { isMenuOpen } = this.state;
    let { locale, currentCategory, screenWidth, backgroundMode } = this.props;

    return (
      <header className="header" ref={ ref => { this.refHeader = ref; }}>
        <div className="header__left">
          <div className="header__title">
            {
              locale == "ko" ?
              <h1>
                <span className="en-black">Google Fonts</span> + 한국어
              </h1> :
              <h1>
                <span className="en-black">Google Fonts</span> + 한국어
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

          {
            screenWidth > BODY_960 ?
            <HeaderCategories /> : null
          }
        </div>

        <div className="header__description-area">
          {
            screenWidth < BODY_960 && isMenuOpen ? 
            <Fragment>
              <HeaderCategories /> 
              <div className="l-apple-box"></div>
            </Fragment>
            : null 
          }
          
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
                <Fragment>
                  <div className="l-apple-box"></div>
                  <AnimationSelector />
                </Fragment>
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

                <Fragment>
                  <div className="l-apple-box"></div>
                  <AnimationSelector />
                </Fragment>
                : null
              }
            </div>
          }
        </div>

        
        <a href="javascript:void(0);" className="header__hamburger" onClick={this.handleMenuOpen.bind(this)}>
          {
            isMenuOpen ? 
            <img src={`./public/assets/close_${backgroundMode}.svg`} alt="menu" /> :
            <img src={`./public/assets/hamburger_${backgroundMode}.svg`} alt="menu" />            
          }
        </a>
      </header>
    )
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale,
    backgroundMode: state.backgroundMode,
    currentCategory: state.currentCategory,
    screenWidth: state.screenWidth
  }
};

export default connect(mapStateToProps)(Header);