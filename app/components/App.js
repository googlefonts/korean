import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, changeBackgroundMode, changeCurrentViewFont, changeHeaderMode, changeHeaderCollapsedTop, changeAnimationIdx, changeAnimationScriptIdx } from '../actions';
import { Header, HeaderCollapsed, FontsList, Description, Footer, NewsfeedLoader, FontCSSLoader, HeaderGutter, GoogleFontBadge } from './';
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
    // document.getElementById("root").addEventListener('click', this.handleBodyClick.bind(this), false);
  }

  handleBodyClick(e){
    let { isOnScript, animationIdx, animationScriptIdx } = this.props;

    if (!isTouchDevice()){
      this.props.dispatch(changeBackgroundMode(this.props.backgroundMode == "black" ? "white" : "black"));   
      if (isOnScript) {

        this.props.dispatch(changeAnimationScriptIdx(++animationScriptIdx % 3));  
      
      } else {

        this.props.dispatch(changeAnimationIdx(++animationIdx % 5));

      }

    } 

   
  }

  componentWillReceiveProps(newProps){
    if (newProps.currentCategory != this.props.currentCategory && 
        newProps.currentCategory.type === "click") {
      this.moveScroll(newProps.currentCategory.id);  
    }
  }

  moveScroll(currentCategory){
    let { headerHeight } = this.props;

    let collapsedHeaderHeight;
    if (!_.isNull(document.querySelector(".header-collapsed"))) {
      collapsedHeaderHeight = document.querySelector(".header-collapsed").offsetHeight;
    } else {
      collapsedHeaderHeight = 62;
    }
    let categoryPosTop = document.querySelector(`a[name=category-${currentCategory}]`).offsetTop;
    let offset = 0;

    TweenMax.to((document.scrollingElement || document.documentElement), 1, { ease: Power3.easeInOut, scrollTop: categoryPosTop - collapsedHeaderHeight - offset - headerHeight });
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

  }

  initScroll(){
    // console.log(this.props.screenHeight);
    this.scroller.setup({
        step: '.font-viewer',
        // debug: true,
        // progress: true,
        offset: (document.querySelectorAll('.font-viewer')[1].offsetTop - 10) / window.innerHeight,//(document.querySelectorAll('.font-viewer')[0].offsetTop + document.querySelectorAll('.font-viewer')[0].offsetHeight - 50) / this.props.screenHeight
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