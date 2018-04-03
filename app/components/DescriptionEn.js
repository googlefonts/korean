import React, { Component } from 'react';
import { changeCurrentDescFontSelected } from '../actions';
import { BODY_960, BODY_600, BODY_1280 } from '../constants/defaults';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { FONTS } from '../constants/defaults';
import _ from 'lodash';
import scrollama from 'scrollama';
import CountUp, { startAnimation } from 'react-countup';

class DescriptionEn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hovered: null, // consonant, vowel, null
      countUpPlay: false,
      oncePlayed: false
    };
  }

  componentDidMount(){
    
    this.scroller = scrollama();

    this.scroller.setup({
        step: '.desc-column-area',
        // debug: true,
        // progress: true,
        offset: (window.innerHeight - 150) / window.innerHeight,
      }).onStepEnter(this.handleStepEnter.bind(this))
        // .onStepProgress(this.handleStepProgress.bind(this))
        // .onStepExit(this.handleStepExit.bind(this));
  }

  handleStepEnter(e){
    this.setState({
      countUpPlay: true
    });
  }

  handleMouseEnter(hov) {
    this.setState({
      hovered: hov
    });
  }

  handleMouseLeave() {
    this.setState({
      hovered: null
    });
  }


  handleCurrentDescFontSelected(name, e) {
    e.stopPropagation();
    this.props.dispatch(changeCurrentDescFontSelected(name));
  }

  retrieveFontName(currentDescFont) {
    var result = {};

    _.each(currentDescFont, (v, k) => {
      let font = _.find(FONTS, fontData => { return v == fontData.id });
      
      result[k] = {
        fontFamily: font.fontName
      };

    });

    return result;
  }

  render() {
    let { currentDescFontSelected, currentDescFont, screenWidth } = this.props;
    let marginRightScale = scaleLinear().domain([960, 1280]).clamp(true).range([20, 150]);
    let selectedOrNot = (areaName) => {
      return areaName == currentDescFontSelected ? "marching-ants" : "";
    }
    let { hovered, countUpPlay, oncePlayed } = this.state;


    if (countUpPlay && !oncePlayed) {

      this.setState({
        oncePlayed: true
      });
      startAnimation(this.bigCountUp);
      startAnimation(this.smCountUp);
    }

    var fontNames;

    try {
      fontNames = this.retrieveFontName(currentDescFont);
    } catch(e){
      fontNames = {
        paragraph: {
          fontFamily: "Roboto",
          lineHeight: "1.45em"
        },
        title: {
          fontFamily: "Roboto",
          lineHeight: "1.35em"
        }
      }
    }



    return (
      <div className="description__container">

        <div className="l-apple-box--double">
        </div>
        
        <h3 style={fontNames.title}>
          Great typography makes the web more beautiful, fast, and open. Using machine learning and the latest web standards, Google Fonts now offers the open source Korean fonts showcased in this website.
        </h3>

        <h4 style={fontNames.title}>
          <span className="underline">
          Why do Korean fonts pose a challenge for web use?
          </span>
        </h4>

        <p style={fontNames.paragraph}>
          Hangul consists of 19 consonants, designed after the shapes of the articulators when making the sounds, and 21 vowels, evolved from three basic shapes representing the sky, the earth, and human. These elements, called jamo, are then grouped into syllabic blocks, making up the letters.
        </p>

        <div className="desc-jamo-area">
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} className={`vowel vertical ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div>
          </div>
          <div className="letter narrow">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div>
          </div>
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel vertical long ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div>
          </div>
          <div className="letter narrow">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short stacked ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
          </div>
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel vertical ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short indent stacked ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
          </div>
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel vertical short ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>Vowel</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short indent stacked ${ hovered === "consonant" ? "highlighted" : ""}`}>Conso-<br/>nant</div>
          </div>
        </div>


        <p style={fontNames.paragraph}>
          In Hangul, the visual balance of a jamo changes in relation to its surrounding jamo, similar to Chinese letters or Japanese kana. For this reason, a Korean font usually includes every possible combination of jamo, resulting in 11,172 glyphs. Developing a font with this many glyphs requires not only significant time and expense, but also results in a much larger file size. For example, Google is developing the Noto fonts to support all languages, and while the Noto Latin font is 445KB, the Noto Simplified Chinese (SC) font is 15.7MB, containing a total of 44,683 glyphs. The large file sizes have been the biggest hurdle to using Korean fonts effectively on the web.
        </p>

        <div className="desc-column-area">
          {
            screenWidth < BODY_1280 ? 
            <div className="right">
              <div className="right-wrap">
                <h5 className="inline_en_num" style={fontNames.title}>
                  <CountUp separator=',' start={0} end={65535} ref={(countUp) => { this.bigCountUp = countUp; }} />
                </h5>
                <p style={fontNames.paragraph}>
                  Total Number of Glyphs (CJK)<br/>
                  Noto Sans CJK
                </p>
              </div>

              <div className="right-wrap">
                <h5 className="inline_en_num" style={fontNames.title}>
                  <CountUp separator=',' start={0} end={2416} ref={(countUp) => { this.smCountUp = countUp; }} />
                </h5>
                <p style={fontNames.paragraph}>
                  Total Number of Glyphs (Latin+Greek+Cyrilic)<br/>
                  Noto Sans
                </p>
              </div>
            </div> : null
          }
          <div className="left">
            <h4 style={fontNames.title}>
              <span className="underline">
              Google Fonts uses font subsetting, informed by machine learning
              </span>
            </h4>


            <p style={fontNames.paragraph}>
              By scanning Korean web pages, Google modeled which characters are most likely to appear together, which informed a subset slicing strategy that sorts all 17,388 glyphs into over 100 slices. Using this method, the user sees all the glyphs in the desired font, because their browser only loads the font slices required for that page. This means much faster loading times.
            </p>

            <p style={fontNames.paragraph}>
              Cross-site caching is another key benefit of using the Google Fonts API, and since each font slice can be used across websites, the latency benefits increase over time.
            </p>

          </div>
          {
            screenWidth >= BODY_1280 ? 
            <div className="right">
              <div className="right-wrap">
                <h5 className="inline_en_num" style={fontNames.title}>
                  <CountUp separator=',' start={0} end={65535} ref={(countUp) => { this.bigCountUp = countUp; }} />
                </h5>
                <p style={fontNames.paragraph}>
                  Total Number of Glyphs (CJK)<br/>
                  Noto Sans CJK
                </p>
              </div>

              <div className="right-wrap">
                <h5 className="inline_en_num" style={fontNames.title}>
                  <CountUp separator=',' start={0} end={2416} ref={(countUp) => { this.smCountUp = countUp; }} />
                </h5>
               <p style={fontNames.paragraph}>
                  Total Number of Glyphs (Latin+Greek+Cyrilic)<br/>
                  Noto Sans
                </p>
              </div>
            </div> : null
          }
         
         

        </div>



        

        
        <h4 style={fontNames.title}>
          <span className="underline">
          Google Fonts + Korean embraces open source values
          </span>
        </h4>

        <p style={fontNames.paragraph}>
          All the fonts in our catalog are free and open source, following the SIL Open Font License (OFL). This license, specially created for fonts and related software, provides the legal framework for sharing favorites and collaborating easily with friends and colleagues across the globe. Google Fonts takes care of all the licensing and hosting, ensuring that the latest and greatest version of any font is available to everyone. 
        </p>




      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    currentDescFont: state.currentDescFont,
    locale: state.locale,
    currentDescFontSelected: state.currentDescFontSelected
  }
};

export default connect(mapStateToProps)(DescriptionEn);
