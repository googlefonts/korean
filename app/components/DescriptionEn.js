import React, { Component } from 'react';
import { changeCurrentDescFontSelected } from '../actions';
import { BODY_960, BODY_600, BODY_1280 } from '../constants/defaults';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { FONTS } from '../constants/defaults';
import _ from 'lodash';

class DescriptionEn extends Component {

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

    let fontNames = this.retrieveFontName(currentDescFont);

    return (
      <div className="description__container">

        <div className="l-apple-box--double">
        </div>
        
        <h3 style={fontNames.title}>
         Google Fonts has been making the web more beautiful, fast, and open through great typography. Optimized by machine learning, Google Fonts now offers Korean and this showcase website.
        </h3>

        <h4 style={fontNames.title}>
          Why do Korean fonts pose a challenge for web use?
        </h4>

        <p style={fontNames.paragraph}>
          Hangul consists of 19 consonants, designed after the shapes of the articulators when making the sounds, and 21 vowels, evolved from three basic shapes representing the sky, the earth, and human. These elements, called jamo, are then grouped into syllabic blocks, making up the letters. Hangul was originally intended to be written from top to bottom and right to left since its inception in 1446 (then called Hunminjeongeum) but is now generally written from left to right, with spaces between words and Western punctuation.
        </p>

        <div className="desc-jamo-area">
          <div class="letter">
            <div class="consonant">Conso-<br/>nant</div>
            <div class="vowel vertical">Vowel</div>
          </div>
          <div class="letter narrow">
            <div class="consonant">Conso-<br/>nant</div><br/>
            <div class="vowel stacked">Vowel</div>
          </div>
          <div class="letter">
            <div class="consonant">Conso-<br/>nant</div>
            <div class="vowel vertical long">Vowel</div><br/>
            <div class="vowel stacked">Vowel</div>
          </div>
          <div class="letter narrow">
            <div class="consonant short">Conso-<br/>nant</div><br/>
            <div class="vowel stacked">Vowel</div><br/>
            <div class="consonant short stacked">Conso-<br/>nant</div>
          </div>
          <div class="letter">
            <div class="consonant">Conso-<br/>nant</div>
            <div class="vowel vertical">Vowel</div><br/>
            <div class="consonant short indent stacked">Conso-<br/>nant</div>
          </div>
          <div class="letter">
            <div class="consonant short">Conso-<br/>nant</div>
            <div class="vowel vertical short">Vowel</div><br/>
            <div class="vowel stacked">Vowel</div><br/>
            <div class="consonant short indent stacked">Conso-<br/>nant</div>
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
                <h5 style={fontNames.title}>
                  65,535
                </h5>
                <p style={fontNames.paragraph}>
                  Total Number of Glyph (Hangul)<br/>
                  Noto Sans KR
                </p>
              </div>

              <div className="right-wrap">
                <h5 style={fontNames.title}>
                  2,416
                </h5>
                <p style={fontNames.paragraph}>
                  Total Number of Glyph (Latin + Greek + Cyrilic)<br/>
                  Noto Sans
                </p>
              </div>
            </div> : null
          }
          <div className="left">
            <h4 style={{...fontNames.title, marginTop: screenWidth > BODY_1280 ? 100 : 10 }}>
              Google Fonts uses font subsetting, informed by machine learning
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
                <h5 style={fontNames.title}>
                  65,535
                </h5>
                <p style={fontNames.paragraph}>
                  Total Number of Glyph (Hangul)<br/>
                  Noto Sans KR
                </p>
              </div>

              <div className="right-wrap">
                <h5 style={fontNames.title}>
                  2,416
                </h5>
               <p style={fontNames.paragraph}>
                  Total Number of Glyph (Latin + Greek + Cyrilic)<br/>
                  Noto Sans
                </p>
              </div>
            </div> : null
          }
         
         

        </div>



        

        
        <h4 style={fontNames.title}>
          Google Fonts + Korean embraces open source values
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
