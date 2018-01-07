import React, { Component } from 'react'
import { DescriptionFontSelector } from './';
import { connect } from 'react-redux';

class Description extends Component {
  render() {
    let { currentDescFont } = this.props;
    return (
      <section className="description">
        <DescriptionFontSelector />

        <h3 style={{ fontFamily: currentDescFont }}>
          구글폰트 + 한국어 얼리억세스
        </h3>

        <p style={{ fontFamily: currentDescFont }}>
          구글폰트 + 한국어 얼리억세스는 아직 구글폰트에서 공식으로 지원하지는 않지만 손쉽게 라이센스의 제약없이 사용 할 수 있는 한국어 오픈소스 웹폰트의 목록입니다.
        </p>
      </section>
    )
  }
}

let mapStateToProps = state => {
  return {
    currentDescFont: state.currentDescFont
  }
}

export default connect(mapStateToProps)(Description);