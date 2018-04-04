import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, changeBackgroundMode, changeCurrentViewFont, changeHeaderMode, changeHeaderCollapsedTop, changeAnimationIdx, changeAnimationScriptIdx, changeIsOnScript } from '../actions';
import { Header, HeaderCollapsed, FontsList, Description, Footer, NewsfeedLoader, FontCSSLoader, HeaderGutter, GoogleFontBadge } from './';
import { BODY_480 } from '../constants/defaults';
import scrollama from 'scrollama';
import { scaleLinear } from 'd3';
import 'gsap';
import paper from 'paper';
import { isTouchDevice } from '../utils';


const Fragment = React.Fragment;

class App extends Component {
  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.headerTopScale = scaleLinear().domain([62, 0]).clamp(true).range([0, -62]);

    this.scroller = scrollama();
    this.handleBodyClick = this.handleBodyClick.bind(this);
  }


  componentWillMount(){

  }
  
  componentDidMount(){

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    this.handleResize();
    if (this.props.currentCategory.id === 3) {
      document.getElementById('favicon').setAttribute('href','./public/assets/favicon-script_' + this.props.animationScriptIdx + '.png');
    } else {
      document.getElementById('favicon').setAttribute('href','./public/assets/favicon_' + this.props.animationIdx + '.png');
    }
    

    // document.getElementById("root").addEventListener('click', this.handleBodyClick.bind(this), false);
  }

  handleBodyClick(e){
    let { isOnScript, animationIdx, animationScriptIdx } = this.props;


    if (!isTouchDevice()){
      this.props.dispatch(changeBackgroundMode(this.props.backgroundMode == "black" ? "white" : "black"));   

      let c1 = document.querySelector('.font-container[data-category-id="1"]');
      let c2 = document.querySelector('.font-container[data-category-id="2"]');
      let c3 = document.querySelector('.font-container[data-category-id="3"]');

      let s1StartY = c1.offsetTop;
      let s1EndY = c2.offsetTop + c2.offsetHeight;
      let s2StartY = c3.offsetTop;
      let s2EndY = c3.offsetTop + c3.offsetHeight;

      if (e.pageY >= s1StartY && e.pageY < s1EndY) {
        
        this.props.dispatch(changeIsOnScript(false));
        this.props.dispatch(changeAnimationIdx(++animationIdx % 5));

      } else if (e.pageY >= s2StartY && e.pageY < s2EndY) {

        this.props.dispatch(changeIsOnScript(true));
        this.props.dispatch(changeAnimationScriptIdx(++animationScriptIdx % 3));  

      } else {

        if (isOnScript) {

          this.props.dispatch(changeAnimationScriptIdx(++animationScriptIdx % 3));  
        
        } else {

          this.props.dispatch(changeAnimationIdx(++animationIdx % 5));

        }
      }

      

    } 

   
  }

  componentWillReceiveProps(newProps){
    if (newProps.currentCategory.id != this.props.currentCategory.id) {

      if (newProps.currentCategory.id === 3) {
        document.getElementById('favicon').setAttribute('href','./public/assets/favicon-script_' + newProps.animationScriptIdx + '.png');
      } else {
        document.getElementById('favicon').setAttribute('href','./public/assets/favicon_' + newProps.animationIdx + '.png');
      }
      
      if (newProps.currentCategory.type === "click") {
        this.moveScroll(newProps.currentCategory.id);    
      }
    } 

    if (newProps.animationIdx != this.props.animationIdx) {
      
      document.getElementById('favicon').setAttribute('href','./public/assets/favicon_' + newProps.animationIdx + '.png');

    } else if (newProps.animationScriptIdx != this.props.animationScriptIdx) {

      document.getElementById('favicon').setAttribute('href','./public/assets/favicon-script_' + newProps.animationScriptIdx + '.png');
    }

  }

  moveScroll(currentCategory){
    let { headerHeight, screenWidth } = this.props;

    let collapsedHeaderHeight;
    if (!_.isNull(document.querySelector(".header-collapsed"))) {
      collapsedHeaderHeight = screenWidth > BODY_480 ? 90 : 130;// : 250;
    } else {
      collapsedHeaderHeight = screenWidth > BODY_480 ? 90 : 220;
    }
    let categoryPosTop = document.querySelector(`a[name=category-${currentCategory}]`).offsetTop;

    TweenMax.to((document.scrollingElement || document.documentElement), 1, { ease: Power3.easeInOut, scrollTop: categoryPosTop - collapsedHeaderHeight });
  }

  handleScroll(e){
      

    var descTop = document.querySelector('.description').getBoundingClientRect().top;
    var scrollY = window.scrollY;
    let collapsedHeaderHeight;
    
    if (!_.isNull(document.querySelector(".header-collapsed"))) {
      collapsedHeaderHeight = document.querySelector(".header-collapsed").offsetHeight;
    } else {
      collapsedHeaderHeight = 62;
    }

    this.headerTopScale.domain([collapsedHeaderHeight, 0]).range([0, -collapsedHeaderHeight]);

    // console.log("descTop: ", descTop);
    if (descTop < collapsedHeaderHeight && descTop >= 0) {
      
      this.props.dispatch(changeHeaderCollapsedTop(this.headerTopScale(descTop)));
    
    } else {

      this.props.dispatch(changeHeaderCollapsedTop(0));
      
    }

    if (descTop < 0) {

      this.props.dispatch(changeHeaderMode("black"));

    } else {

      if (scrollY < 60) {
        
        this.props.dispatch(changeHeaderMode("expanded"));

      } else {
      
        this.props.dispatch(changeHeaderMode("collapsed"));
      
      } 
    }

    let c1 = document.querySelector('.font-container[data-category-id="1"]');
    let c2 = document.querySelector('.font-container[data-category-id="2"]');
    let c3 = document.querySelector('.font-container[data-category-id="3"]');

    let s1StartY = c1.offsetTop;
    let s1EndY = c2.offsetTop + c2.offsetHeight;
    let s2StartY = c3.offsetTop;
    let s2EndY = c3.offsetTop + c3.offsetHeight;

    let elem = (document.scrollingElement || document.documentElement);
    if (elem.scrollTop >= s1StartY && elem.scrollTop < s1EndY) {
      
      this.props.dispatch(changeIsOnScript(false));
      this.props.dispatch(changeAnimationIdx(++animationIdx % 5));

    } else if (elem.scrollTop >= s2StartY && elem.scrollTop < s2EndY) {

      this.props.dispatch(changeIsOnScript(true));
    }
  }

  initScroll(){
    // console.log(this.props.screenHeight);
    this.scroller.setup({
        step: '.font-viewer',
        // debug: true,
        // progress: true,
        offset: (document.querySelectorAll('.font-viewer')[1].offsetTop - 140) / window.innerHeight,//(document.querySelectorAll('.font-viewer')[0].offsetTop + document.querySelectorAll('.font-viewer')[0].offsetHeight - 50) / this.props.screenHeight
      }).onStepEnter(this.handleStepEnter.bind(this))
        // .onStepProgress(this.handleStepProgress.bind(this))
        .onStepExit(this.handleStepExit.bind(this));
  }


  handleStepEnter(e){
    if (this.props.currentViewFont != Number(e.element.dataset.id)) {
      this.props.dispatch(changeCurrentViewFont(Number(e.element.dataset.id)));
    }
  }

  handleStepExit(e){
    if (window.scrollY < this.props.headerHeight) {
      this.props.dispatch(changeCurrentViewFont(1)); 
    } else {
      this.props.dispatch(changeCurrentViewFont(null));
    
    }
    
  }


  updateBackground(newProps){

  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleResize(e){
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));

    this.initScroll();
    this.handleScroll();
    this.scroller.resize();
  
  }

  render() {
    let { headerMode, backgroundMode } = this.props;

    return (
      <Fragment>
        <section onClick={this.handleBodyClick}>
          <NewsfeedLoader />
          {
            headerMode == "expanded" ? 
            <Header /> : (headerMode == "collapsed" ? <HeaderCollapsed /> : null)
          }        
          <HeaderGutter />
          <FontsList />
          <section className="description-footer">
            <Description />
            <Footer />
          </section>
          <FontCSSLoader />
        </section>
        <link rel="stylesheet" media="all" href={`./public/style_${backgroundMode}.css`} async />
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    headerMode: state.headerMode,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    currentCategory: state.currentCategory,
    currentViewFont: state.currentViewFont,
    headerHeight: state.headerHeight,
    locale: state.locale,
    backgroundMode: state.backgroundMode,
    isOnScript: state.isOnScript,
    animationIdx: state.animationIdx,
    animationScriptIdx: state.animationScriptIdx
  }
}

export default connect(mapStateToProps)(App);