import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAnimationIdx } from '../actions';

class AnimationSelector extends Component {
  handleClick(idx, e){
    
    e.stopPropagation();
    this.props.dispatch(changeAnimationIdx(idx));
  }

  render() {
    let { animationIdx } = this.props;
    return (
      <div className="anim-selector">
        <ul>
          <li>
            <a onClick={this.handleClick.bind(this, 0) } className={`anim-selector__link${ animationIdx == 0 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 1) } className={`anim-selector__link${ animationIdx == 1 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 2) } className={`anim-selector__link${ animationIdx == 2 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 3) } className={`anim-selector__link${ animationIdx == 3 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 4) } className={`anim-selector__link${ animationIdx == 4 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 5) } className={`anim-selector__link${ animationIdx == 5 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 6) } className={`anim-selector__link${ animationIdx == 6 ? "--selected" : "" }`} href="javascript:void(0);">
              ㅁ
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    animationIdx: state.animationIdx
  }
}

export default connect(mapStateToProps)(AnimationSelector);