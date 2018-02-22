import React, { Component } from 'react';
import { CATEGORIES, BODY_600, BODY_960 } from '../constants/defaults';
import { connect } from 'react-redux';
import { AnimationSelector, DropDownCategorySelector, AnimationScriptSelector } from './';
import { changeLocale, changeCurrentCategory, changeHeaderHeight, changeCategoryDropdownOpened } from '../actions';
import scrollama from 'scrollama';
import { changeIsOnScript } from '../actions';

const Fragment = React.Fragment;

class HeaderCollapsed extends Component {
  constructor(props){
    super(props);

    this.scroller = scrollama();
    this.state = {
      isMenuOpen: false
    };
  }

  componentDidMount(){

    this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight + 20));

    this.scroller.setup({
        step: '.font-script-container',
        // debug: true,
        // progress: true,
        offset: 60 / this.props.screenHeight
      }).onStepEnter(this.handleStepEnter.bind(this))
        // .onStepProgress(this.handleStepProgress.bind(this))
        .onStepExit(this.handleStepExit.bind(this));
  }

  handleStepEnter(e){
    this.props.dispatch(changeIsOnScript(true)); 
  }

  handleStepExit(e){  
    this.props.dispatch(changeIsOnScript(false));
  }

  componentWillReceiveProps(newProps){
    if (this.props.screenWidth != newProps.screenWidth) {
      this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
      this.setState({
        isMenuOpen: false
      });
    }

  }

  handleToggleLocale(e) {

    e.stopPropagation();
    this.props.dispatch(changeLocale(this.props.locale === "ko" ? "en" : "ko"));
  }

  handleCurrentCategory(categoryData, e){
    
    e.stopPropagation();
    this.props.dispatch(changeCurrentCategory(categoryData.id));
  }
  
  toggleMenu(e){
    e.stopPropagation();
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  handleCategoryClick(e){

    e.stopPropagation();

    if (!this.props.categoryDropdownOpened) {
      this.props.dispatch(changeCategoryDropdownOpened(true));
    }    
  }

  render() {
    // let {  } = this.state;
    let { isOnScript, categoryDropdownOpened, locale, screenWidth, headerCollapsedTop, backgroundMode } = this.props;
    let currentCategory = _.find(CATEGORIES, categoryData => { return categoryData.id == this.props.currentCategory; });

    return (
      <Fragment>
        <header className="header-collapsed" style={{ top: headerCollapsedTop }} ref={ ref => { this.refHeader = ref; }}>
        {
          
                    // <AnimationScriptSelector />
        }
          <div className="header-collapsed__flexwrap">
            <div className="header-collapsed__left">
              {
                locale == "ko" ? 
                <h1>
                  구글폰트 + 한국어 얼리억세스
                </h1>
                : 
                <h1 className="en-black">
                  Google Fonts + Korean Early Access
                </h1>
              }

              {
                screenWidth > BODY_960 ? 
                <div className="header-collapsed__categories">
                  <a className="category-selector--selected" href="javascript:void(0);" onClick={ this.handleCategoryClick.bind(this) }>
                    {
                      locale == "ko" ?
                      <Fragment>
                        <div className="category-selector__label-ko-collapsed">
                          {
                            currentCategory.nameKo
                          }
                        </div>
                        <div className="category-selector__label-en-right">
                          {
                            currentCategory.nameEn
                          }
                        </div>
                        <img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" />
                      </Fragment> : 
                      <Fragment>
                        <div className="category-selector__label-en-collapsed">
                          {
                            currentCategory.nameEn
                          }
                        </div>
                        <div className="category-selector__label-ko-right">
                          {
                            currentCategory.nameKo
                          }
                        </div>
                        <img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" />
                      </Fragment>
                    }
                  </a>
                </div> : null 
              }
            </div>
            {
              screenWidth > BODY_600 ? 
              (isOnScript ? <AnimationScriptSelector/> : <AnimationSelector />) : null
            }
            
            {
              screenWidth > BODY_960 || (screenWidth > BODY_600 && this.state.isMenuOpen) ? (locale == "ko" ? 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="">
                    한국어 얼리억세스 소개 
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="en-black">
                    English
                  </a>
                </div>
              </div> : 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="">
                    Introduction
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                    한국어
                  </a> 
                </div>
              </div>) : null
            }

            <a href="javascript:void(0);" onClick={this.toggleMenu.bind(this)} className="header-collapsed__hamburger">
              {
                this.state.isMenuOpen ? 
                <img src={`./public/assets/close_${backgroundMode}.svg`} alt="menu" /> :
                <img src={`./public/assets/hamburger_${backgroundMode}.svg`} alt="menu" />
              }
            </a>
          </div>
          {
            (this.state.isMenuOpen) ? 
            <Fragment>
              <div className="header-collapsed__categories">
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
              {
                screenWidth <= BODY_600 ? (locale == "ko" ? 
                <div className={`header__menu--${locale}`} style={{ marginTop: 10}}>
                  <div>
                    <a href="javascript:void(0)" className="">
                      한국어 얼리억세스 소개 
                    </a>
                    <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                      English
                    </a>
                  </div>
                </div> : 
                <div className={`header__menu--${locale}`}>
                  <div>
                    <a href="javascript:void(0)" className="">
                      Introduction
                    </a>
                    <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                      한국어
                    </a> 
                  </div>
                </div>) : null
              }
            </Fragment> : null
          }
        </header>
        {
          categoryDropdownOpened ? 
          <DropDownCategorySelector /> : null
        }
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale, 
    currentCategory: state.currentCategory,
    categoryDropdownOpened: state.categoryDropdownOpened,
    screenWidth: state.screenWidth,
    isOnScript: state.isOnScript,
    screenHeight: state.screenHeight,
    headerCollapsedTop: state.headerCollapsedTop,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(HeaderCollapsed);