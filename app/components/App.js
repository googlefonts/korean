import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, changeBackgroundMode, changeCurrentViewFont, changeHeaderMode, changeHeaderCollapsedTop } from '../actions';
import { Header, HeaderCollapsed, FontsList, Description, Footer, NewsfeedLoader, FontCSSLoader, HeaderGutter, GoogleFontBadge } from './';
import scrollama from 'scrollama';
import { scaleLinear } from 'd3';
import 'gsap';
import paper from 'paper';

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
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    this.handleResize();

  }
  
  componentDidMount(){
    // document.getElementById("root").addEventListener('click', this.handleBodyClick.bind(this), false);
    this.initScroll();
    this.handleScroll();
  }

  handleBodyClick(e){
    this.props.dispatch(changeBackgroundMode(this.props.backgroundMode == "black" ? "white" : "black"));
  }

  componentWillReceiveProps(newProps){
    if (newProps.currentCategory != this.props.currentCategory) {
      this.moveScroll(newProps.currentCategory);  
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
    let offset = 20;

    TweenMax.to((document.documentElement || document.body.parentNode || document.body), 1, { ease: Power3.easeInOut, scrollTop: categoryPosTop - collapsedHeaderHeight - offset - headerHeight });
  }

  handleScroll(e){
    // console.log(window.scrollTop);
    var descTop = document.querySelector('.description').getBoundingClientRect().top;
    var scrollY = window.scrollY;
    
    // console.log("descTop: ", descTop);
    if (descTop < 62 && descTop >= 0) {
      
      this.props.dispatch(changeHeaderCollapsedTop(this.headerTopScale(descTop)));
    
    } else {

      this.props.dispatch(changeHeaderCollapsedTop(0));
      
    }

    if (descTop < 0) {

      this.props.dispatch(changeHeaderMode("black"));

    } else {

      if (scrollY < 10) {
        
        this.props.dispatch(changeHeaderMode("expanded"));

      } else if (scrollY >= 10) {
      
        this.props.dispatch(changeHeaderMode("collapsed"));
      
      } 
    }

  }

  initScroll(){
    this.scroller.setup({
        step: '.font-viewer',
        // debug: true,
        // progress: true,
        offset: 200 / this.props.screenHeight
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
    this.scroller.resize();
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
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
        <GoogleFontBadge />
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
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(App);