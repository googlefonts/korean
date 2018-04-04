import React, { Component } from 'react';
import { changeCurrentDescFontSelected } from '../actions';
import { BODY_960, BODY_600, BODY_1280 } from '../constants/defaults';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { FONTS } from '../constants/defaults';
import _ from 'lodash';
import scrollama from 'scrollama';
import CountUp, { startAnimation } from 'react-countup';

class DescriptionKo extends Component {
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
        offset: (window.innerHeight - 150) / window.innerHeight,
      }).onStepEnter(this.handleStepEnter.bind(this))
  }

  handleStepEnter(e){
    this.setState({
      countUpPlay: true
    });
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


  render() {
    let { currentDescFontSelected, currentDescFont, screenWidth } = this.props;
    let marginRightScale = scaleLinear().domain([960, 1280]).clamp(true).range([20, 150]);
    let selectedOrNot = (areaName) => {
      return areaName == currentDescFontSelected ? "marching-ants" : "";
    }
    let { hovered, countUpPlay, oncePlayed } = this.state;

    var fontNames;

    if (countUpPlay && !oncePlayed) {

      this.setState({
        oncePlayed: true
      });
      startAnimation(this.bigCountUp);
      startAnimation(this.smCountUp);
    }

    try {
      fontNames = this.retrieveFontName(currentDescFont);
    } catch(e){
      fontNames = {
        paragraph: {
          fontFamily: ""
        },
        title: {
          fontFamily: ""
        }
      }
    }


    return (
      <div className="description__container">

        <div className="l-apple-box--double">
        </div>

        
        <h3 style={fontNames.title}>
          좋은 타이포그래피를 통해 웹은 더욱 아름답고, 빠르며, 누구나 참여할 수 있는 공간이 될 수 있습니다. <span className="inline_en" style={fontNames.title}>Google Fonts</span>는 이 사이트에 수록된 오픈 소스 한글 폰트를 머신 러닝에 기반한 최적화 기술을 통해 시범적으로 제공합니다. 
        </h3>

        <h4 style={fontNames.title}>
          <span className="underline">
          큰 용량은 이제껏 한글 폰트를 웹에서 사용할 때 맞닥뜨리는 가장 큰 걸림돌이었습니다.
          </span>
        </h4>

        <p style={fontNames.paragraph}>
          한글은 발음 구조의 모양을 본뜬 닿자(자음을 나타내는 낱자) <span className="inline_en" style={fontNames.title}>19</span>가지와 하늘, 땅, 인간을 추상화한 홀자(모음을 나타내는 낱자) <span className="inline_en" style={fontNames.title}>21</span>가지로 이루어집니다. 서로 조합된 낱자는 음절 하나를 나타내는 글자가 되고, 글자는 모여 단어가 됩니다.
        </p>

        <div className="desc-jamo-area">
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} className={`vowel vertical ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div>
          </div>
          <div className="letter narrow">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div>
          </div>
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel vertical long ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div>
          </div>
          <div className="letter narrow">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short stacked ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
          </div>
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel vertical ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short indent stacked ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
          </div>
          <div className="letter">
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel vertical short ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "vowel")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`vowel stacked ${ hovered === "vowel" ? "highlighted" : ""}`}>모음</div><br/>
            <div onMouseEnter={this.handleMouseEnter.bind(this, "consonant")} onMouseLeave={this.handleMouseLeave.bind(this)} className={`consonant short indent stacked ${ hovered === "consonant" ? "highlighted" : ""}`}>자음</div>
          </div>
        </div>

        <p style={fontNames.paragraph}>
          한글의 각 글자에서 낱자는 주변 낱자와의 관계에 따라 모양이 조금씩 달라지고, 이런 현상은 한자와 가나에서도 나타납니다. 따라서 한글을 바르게 표시하기 위해서는 기본적으로 낱자를 모두 조합한 <span className="inline_en" style={fontNames.title}>11,172</span>가지 글리프를 폰트에 포함해야 합니다. 이는 폰트를 제작하는 기간과 비용뿐 아니라 파일의 용량에도 큰 영향을 미칩니다. 예컨대 Google이 전 세계의 모든 문자를 표시하기 위해 개발하고 있는 노토 산스(<span className="inline_en" style={fontNames.title}>Noto Sans</span>) 로마자 버전의 용량은 <span className="inline_en" style={fontNames.title}>445KB</span>에 불과하지만, <span className="inline_en" style={fontNames.title}>44,683</span>가지 글자를 포함한 <span className="inline_en" style={fontNames.title}>CJK</span> 버전은 <span className="inline_en" style={fontNames.title}>15.7MB</span>에 달하며, 폰트를 완전히 다운로드하기 전까지는 페이지가 바르게 표시되지 않습니다. 이는 지금까지 웹에서 다양한 한글 폰트를 제대로 이용하는 데 큰 제약이었습니다.
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
                  총 글리프 개수 (한글+한자+간지)<br/>
                  <span className="inline_en" style={fontNames.title}>Noto Sans CJK</span>
                </p>
              </div>

              <div className="right-wrap">
                <h5 className="inline_en_num" style={fontNames.title}>
                  <CountUp separator=',' start={0} end={2416} ref={(countUp) => { this.smCountUp = countUp; }} />
                </h5>
                <p style={fontNames.paragraph}>
                  총 글리프 개수 (라틴+그리스+키릴자모)<br/>
                  <span className="inline_en" style={fontNames.title}>Noto Sans</span>
                </p>
              </div>
            </div> : null
          }
          <div className="left">
            <h4 style={fontNames.title}>
              <span className="underline"><span className="inline_en" style={fontNames.title}>Google Fonts</span>는 머신 러닝에 기반을 둔 최적화 기술을 통해 한글 폰트를 동적으로 분할 다운로드합니다.</span>
            </h4>


            <p style={fontNames.paragraph}>
              웹상의 방대한 한국어 문서를 분석한 결과, Google은 주제에 따라 사용되는 글자의 패턴을 발견하고, 패턴에 따라 한글 폰트에 포함된 <span className="inline_en" style={fontNames.title}>17,388</span>개의 글리프를 <span className="inline_en" style={fontNames.title}>100</span>여 가지 그룹으로 나누었습니다. 그리고 <span className="inline_en" style={fontNames.title}>Google Fonts</span>에서는 사용자가 웹 페이지를 불러올 때, 폰트 전체를 다운로드 하는 대신 내용을 표시하는 데 꼭 필요한 몇 가지 그룹만을 선택적으로 다운로드 하는 방식으로 폰트를 제공합니다. 이 기술을 적용한 <span className="inline_en" style={fontNames.title}>Google Font</span>를 사용하면 폰트 전체를 다운로드한 것과 다름없는 페이지를 보다 빠르게 제공할 수 있습니다. 
            </p>


            <p style={fontNames.paragraph}>
              또한 <span className="inline_en" style={fontNames.title}>Google Fonts API</span>의 사이트 간 캐싱(<span className="inline_en" style={fontNames.title}>cross-site caching</span>)을 통해 해당 폰트가 여러 웹사이트에서 사용될수록 전체 다운로드 시간은 줄어들고, 한글 웹 폰트를 둘러싼 사용자 경험은 그만큼 개선될 것입니다.
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
                  총 글리프 개수 (한글+한자+간지)<br/>
                  <span className="inline_en" style={fontNames.title}>Noto Sans CJK</span>
                </p>
              </div>

              <div className="right-wrap">
                <h5 className="inline_en_num" style={fontNames.title}>
                  <CountUp separator=',' start={0} end={2416} ref={(countUp) => { this.smCountUp = countUp; }} />
                </h5>
                <p style={fontNames.paragraph}>
                  총 글리프 개수 (라틴+그리스+키릴자모)<br/>
                  <span className="inline_en" style={fontNames.title}>Noto Sans</span>
                </p>
              </div>
            </div> : null
          }
         
         

        </div>



        <h4 style={fontNames.title}>
          <span className="underline"><span className="inline_en" style={fontNames.title}>Google Fonts</span> + 한국어는 공공을 위한 가치를 지향합니다.</span>
        </h4>


        <p style={fontNames.paragraph}>
          <span className="inline_en" style={fontNames.title}>Google Fonts</span> + 한국어에 실린 모든 폰트는 오픈 폰트 라이선스(<span className="inline_en" style={fontNames.title}>OFL</span>)를 따르므로, 누구나 마음에 드는 폰트를 자유롭게 사용하고, 친구나 직장 동료와 공유할 수 있습니다. 소수 문자의 발전을 추구하는 비영리 기관인 ‘국제 <span className="inline_en" style={fontNames.title}>SIL</span>’에서 제안한 오픈 폰트 라이선스의 대상은 폰트 및 폰트 디자인, 언어를 활용하는 소프트웨어의 개발 및 엔지니어링 등을 망라합니다. 오픈 폰트 라이선스는 세계 어느 곳에서나 폰트 관련 기술을 협력적으로 개발 및 공유하고, 개선할 수 있는 법적 기반을 제공합니다. 
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

export default connect(mapStateToProps)(DescriptionKo);
