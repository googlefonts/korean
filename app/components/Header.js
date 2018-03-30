import React, { Component } from 'react'
import { CATEGORIES, BODY_600, BODY_960, BODY_820 } from '../constants/defaults';
import { connect } from 'react-redux';
import { AnimationSelector, HeaderCategories } from './';
import { changeLocale, changeCurrentCategory, changeHeaderHeight } from '../actions';
import 'gsap';

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
  componentDidUpdate(){
    
    this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
  }

  handleToggleLocale(e) {
    e.stopPropagation();
    this.props.dispatch(changeLocale(this.props.locale === "ko" ? "en" : "ko"));
  }

  moveToDescription(e){
    e.stopPropagation();
    let pos = document.querySelector("a[name=description-indicator]").offsetTop;

    TweenMax.to((document.scrollingElement || document.documentElement), 1, { ease: Power3.easeInOut, scrollTop: pos });
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
        <div className="header__wrap">

          <div className="header__left">
            <div className="header__title">
              {
                locale == "ko" ?
                <h1>
                  <span className="en-black">Google Fonts + </span> 한국어
                </h1> :
                <h1>
                  <span className="en-black">Google Fonts + Korean</span>
                </h1>
              }
            </div>

            { 
              screenWidth > BODY_600 ? 
              <div className="header__anim-wrap">
                <AnimationSelector />
              </div> : null
            }
            {
              screenWidth > BODY_960 ?
              <HeaderCategories /> : null
            }
          </div>
          {
            screenWidth < BODY_600 ?
            <div className="header__anim-wrap">
              <AnimationSelector />
            </div> : null
          }
          <div className="header__description-area">
            
            {
              screenWidth > BODY_960 ? 
              (locale == "ko" ?
              <div className={`header__description--${locale}`}>
                <span className="en-black">Google Fonts</span>는 양질의 타이포그래피를 통해 웹을 더욱 아름답고 빠르며 누구나 참여할 수 있는 공간으로 만들어왔습니다. <span className="en-black">Google Fonts</span> + 한국어는 오픈소스 한글 폰트를 머신 러닝에 기반을 둔 최적화 기술을 통해 시범적으로 제공하고, 그 가능성을 실험합니다.
              </div> :
              <div className={`header__description--${locale}`}>
                Google Fonts has been making the web more beautiful, fast, and open through great typography. Optimized by machine learning, Google Fonts now offers Korean and this showcase website.
              </div>) : null
            }
            {
              locale == "ko" ? 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className=""  onClick={this.moveToDescription.bind(this)}>
                    <span className="en-black">Google Fonts + </span> 한국어 소개 
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
                  <a href="javascript:void(0)" className="en-black" onClick={this.moveToDescription.bind(this)}>
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

            <a href="javascript:void(0);" className="header__hamburger" onClick={this.handleMenuOpen.bind(this)}>
              {
                isMenuOpen ? 
                <img src={`./public/assets/close_${backgroundMode}.svg`} alt="menu" /> :
                <img src={`./public/assets/hamburger_${backgroundMode}.svg`} alt="menu" />            
              }
            </a>
          </div>

          { 
            screenWidth < BODY_820 ? 
            <Fragment>
              <a href="javascript:void(0);" style={{ top: 26}} className="header__hamburger" onClick={this.handleMenuOpen.bind(this)}>
                {
                  isMenuOpen ? 
                  <img src={`./public/assets/close_${backgroundMode}.svg`} alt="menu" /> :
                  <img src={`./public/assets/hamburger_${backgroundMode}.svg`} alt="menu" />            
                }
              </a>

            </Fragment> : null 
          }
        </div>
        {
          isMenuOpen && screenWidth < BODY_960 ?
          <div className="header__mo">
            <HeaderCategories />
            {
              screenWidth < BODY_820 ? (locale == "ko" ? 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className=""  onClick={this.moveToDescription.bind(this)}>
                    <span className="en-black">Google Fonts + </span> 한국어 소개 
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="en-black">
                    English
                  </a>
                </div>
              </div> : 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="en-black" onClick={this.moveToDescription.bind(this)}>
                    Introduction
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                    한국어
                  </a> 
                </div>
              
              </div>) : null
            }
          </div> : null
        }

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