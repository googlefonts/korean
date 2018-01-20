import React, { Component } from 'react'
import { DescriptionFontSelector } from './';
import { BODY_960, BODY_600 } from '../constants/defaults';
import { connect } from 'react-redux';
import RetinaImage from 'react-retina-image';
import { FONTS } from '../constants/defaults';
import { scaleLinear } from 'd3';
import _ from 'lodash';

class Description extends Component {
  render() {
    let { screenWidth, headerMode } = this.props;
    let currentDescFont = _.find(FONTS, fontData => { return this.props.currentDescFont == fontData.id });
    let fontStyle = { fontFamily: currentDescFont.fontName };
    let marginRightScale = scaleLinear().domain([960, 1280]).clamp(true).range([20, 150]);
    let headerHeight;
    if (_.isNull(document.querySelector('.font-selector-header'))) {

      headerHeight = 110;

    } else {

      headerHeight = document.querySelector('.font-selector-header').offsetHeight;
    }


    return (
      <section className="description">
        <DescriptionFontSelector />
        {
          headerMode == "black" ?
          <div className="description__header-gutter" style={{ height: headerHeight }}></div> : null  
        }
        
        <div className="description__container">
          <h4 style={fontStyle}>
            구글폰트 + 한국어 얼리억세스
          </h4>

          <p className="description__big" style={fontStyle}>
            구글폰트 + 한국어 얼리억세스는 아직 구글폰트에서 공식으로 지원하지는 않지만 손쉽게 라이센스의 제약없이 사용 할 수 있는 한국어 오픈소스 웹폰트의 목록입니다.
          </p>

          <p style={fontStyle}>
            구글폰트는 양질의 타이포그래피를 통해서 웹을 보다 아름답고, 빠르며, 참여 가능한 공간으로 만드는 노력을 해오고 있습니다. 보통의 한글폰트는 그 한글조형의 특성상 65,000개 이상의 글리프를 포함하는데, 이것은 약 2,000개 수준의 글리프를 가진 일반 라틴어 계열폰트의 30배에 달합니다. 이 모든 글리프를 포함하는 거대한 한글폰트의 용량은 페이지를 방문 할때 사용중인 폰트를 다운로드 해야하는 웹 환경에서 한글폰트의 사용을 어렵게 합니다.
          </p>

          <p style={fontStyle}>
            구글폰트 + 한국어 얼리억세스에서는 구글의 머신러닝 기술을 활용, 사용자가 방문한 페이지의 맥락에 맞추어 동적으로 폰트를 분할 다운로드할 수 있는 기술적인 기반을 제공합니다. 정식으로 서비스되는 구글폰트를 사용할때의 여러가지 이점에 더해서, 한국어 얼리억세스에 준비된 폰트들은 기존의 한국어 웹폰트 기술에 비해 x배 빠른 로딩속도를 제공합니다. 
          </p>

          <p style={fontStyle}>
            더불어 이 카탈로그에 포함된 모든 폰트들은 오픈소스 자유소프트웨어로, 누구든지, 어떤 프로젝트에든 제한 없이 사용할 수 있습니다. 구글폰트가 모든 라이센스와 호스팅을 담당하고 있으므로, 마음에 드는 폰트를 사용권한에 얽매이지 않고 친구나 직장동료와 함께 자유롭게 공유할 수 있고, 필요에 따라 얼마든지 수정하거나 재배포 할 수도 있습니다. 
          </p>

          <p style={fontStyle}>
            구글은 구글폰트 얼리억세스를 통해 다양한 웹폰트 관련 기술을 실험하고 있습니다. 구글폰트 + 한국어 얼리억세스에서는 이러한 제반기술이 변화함에 따라, 구글폰트 얼리억세스에서 제공되는 한글 폰트들을 활용하여 다양한 실험을 할 수 있도록 한글을 사용하는 디자이너와 개발자 여러분을 초대합니다. 
          </p>


          <div className="l-apple-box--double"></div>

          <h4 style={fontStyle}>
            한글의 사용
          </h4>

          <p style={fontStyle}>
            한글은 발음 할때의 입모양을 본따 만든 19개의 자음과 21개의 모음으로 구성되어 있습니다. 이 자음과 모음은 초성, 중성, 종성의 블럭으로 조립되어 한개의 음절을 나타내는 글자가 되고, 이 글자들이 모여 단어를 이룹니다. 1446년에 처음 한글이 반포될 때에는 당시의 중국어나 일본어와 마찬가지로 이 글자들을 위에서 아래로 나열하는 세로쓰기를 사용했지만, 현대에는 왼쪽에서 오른쪽으로 가로로 쓰며 단어마다 띄어쓰는등 라틴계열 언어와 비슷한 방식으로 표시합니다.
          </p>

          <p style={fontStyle}>
            이렇게 한글을 표시하는 한글 폰트는 자음과 모음의 여러가지 조합으로 이루어진 합자들 (ligature)의 집합인데, 같은 자음 또는 모음이라도 함께 배치된 다른 요소들과의 관계에 따라 길이나 폭, 또는 형태가 조금씩 달라집니다. 이 때문에 한글을 디자인 할때는 디자이너가 보통 XXXX개 이상의 글자를 그려내야 하는데, 이 글리프의 총량은 폰트파일의 용량과 직접적으로 관련되기 때문에, 한글폰트의 용량은 보통 라틴어 계열 폰트의 용량의 적게는 몇배에서 많게는 수십배에 달하는 경우가 많습니다. 
          </p>

          <p style={fontStyle}>
            한국어 뿐만 아니라 중국어와 일본어에서도 발견되는 이러한 기술적 특징은 세 나라의 언어(CJK)를 사용하는 폰트를 제작하는데에도 많은 시간과 비용을 초래하지만, 이 폰트들을 웹에서 활용하는데서도 걸림돌이 되어 왔습니다. @font-face를 활용한 웹폰트 기술은 웹페이지 방문시에 서버로 부터 폰트 파일을 다운로드할 수 있도록 하는데, xxx메가바이트에 달하는 한글폰트는 현실적으로 사용하기에 어려운 점이 많습니다. 
          </p>

          <p style={fontStyle}>
            구글 폰트를 사용하면 cross-site caching 을 통해 특정 폰트를 한번 로드하면, 해당 폰트를 사용하는 다른 웹사이트를 방문했을 때에 캐시를 활용하여 보다 빠르게 웹페이지를 브라우저에 표시할 수 있습니다. 더불어 얼리억세스에서는 CJK 언어를 위해 개발한 동적분할 다운로드를 통해 한글폰트가 가진 기술적 제약을 넘어서는 방법을 제공합니다. 
          </p>

          <h4 style={fontStyle}>
            구글의 머신러닝 기술 소개
          </h4>

          <div className="description__column-container">
            {
              screenWidth <= BODY_960 ? 
              <div className="description__column-right">
                <div className="description__stat-wrap">
                  <h5 className="description__big-numeric" style={fontStyle}>
                    65,535
                  </h5>
                  <p className="right" style={fontStyle}>
                    총 글리프 개수 (한글)<br/>
                    Noto Sans CJK KR
                  </p>
                </div>

                <div className="description__stat-wrap">

                  <h5 className="description__big-numeric" style={fontStyle}>
                    2,416
                  </h5>
                  <p className="right" style={fontStyle}>
                    총 글리프 개수 <br/>(라틴 + 그리스 + 키릴자모)<br/>
                    Noto Sans
                  </p>

                </div>
              </div> : null
            }
            <div className="description__column-left" style={{ marginRight: marginRightScale(screenWidth) }}>
              <p style={fontStyle}>
                Since 2015, the Google Fonts API has been available in mainland China, but Chinese users face a problem using webfonts in their own language: While Latin webfonts are typically 100–400KB and other writing systems usually range between 200–600KB, the Noto Sans SC (Simplified Chinese) font file is much larger (around 19MB) because it includes 44,683 characters.
              </p>

              <p style={fontStyle}>
                The experience for Chinese webfont users can be improved if the file size and webfont latency are reduced: In any large corpus of documents, there are patterns in character usage. By scanning webpages in Chinese, we model which characters are most likely to appear together, which informs a static subset slicing strategy that sorts all 44,683 glyphs into 102 slices.
              </p>

              <p style={fontStyle}>
                Using this method, the entire web page will seem to be using Noto Sans SC while only loading the set of font slices required for that page, which we expect to be much faster than loading the whole font. Cross-site caching is a key benefit of using the Google Fonts API, and since each slice of this font can be used across websites, the latency benefits increase over time.
              </p>

              <p style={fontStyle}>
                For more information about Noto, check out the other parts of Noto available on this page, and visit google.com/get/noto. Another version of the 'Noto Sans SC' family is also available on this page, which does not support the slicing optimization but includes more styles.
              </p>
            </div>

            {
              screenWidth > BODY_960 ? 
              <div className="description__column-right">
                <div className="description__stat-wrap">
                  <h5 className="description__big-numeric" style={fontStyle}>
                    65,535
                  </h5>
                  <p className="right" style={fontStyle}>
                    총 글리프 개수 (한글)<br/>
                    Noto Sans CJK KR
                  </p>
                </div>

                <div className="description__stat-wrap">

                  <h5 className="description__big-numeric" style={fontStyle}>
                    2,416
                  </h5>
                  <p className="right" style={fontStyle}>
                    총 글리프 개수 <br/>(라틴 + 그리스 + 키릴자모)<br/>
                    Noto Sans
                  </p>

                </div>
              </div> : null
            }

          </div>


          <h4 style={fontStyle}>
            SIL 오픈 폰트 라이센스 (OFL)
          </h4>

          <p style={fontStyle}>
            소수 언어 발전을 추구하는 비영리 기관 국제 SIL에서 제안한 SIL 오픈 폰트 라이센스는 폰트와 폰트 디자인, 그리고 언어를 활용하는 소프트웨어의 개발과 엔지니어링을 위해 고안된 자유 소프트웨어 라이센스 입니다. 실질적으로 오픈소스 폰트 라이센스의 세계적 표준이 된 OFL은 세계 어느곳에서나 폰트와 관련한 제반 기술을 협력적으로 개발 및 공유하고, 개선해나갈 수 있는 법적 기반을 제공합니다. 이를 통해  폰트 저작권자들은 사용자들에게 단순사용 또는 번들링, 변형, 그리고 재배포를 허용할 수 있습니다. 
          </p>

          <p style={fontStyle}>
            구글폰트 + 한국어 얼리억세스에 수록된 모든 폰트는 공공의 가치를 지향하며, 특정 컴퓨팅 플랫폼이나 환경에 종속적이지 않으며, 어떤 개인이나 기관도 사용할 수 있도록 OFL을 사용하고 있습니다. 
          </p>

        </div>
      </section>
    )
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont,
    screenWidth: state.screenWidth,
    headerMode: state.headerMode
  }
}

export default connect(mapStateToProps)(Description);