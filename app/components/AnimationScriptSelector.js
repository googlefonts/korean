import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAnimationScriptIdx } from '../actions';

class AnimationScriptSelector extends Component {
  handleClick(idx, e){
    
    e.stopPropagation();
    this.props.dispatch(changeAnimationScriptIdx(idx));
  }

  render() {
    let { animationScriptIdx } = this.props;

    return (
      <div className="anim-script-selector">
        <div className="anim-selector">
          <ul>
            <li>
              <a onClick={this.handleClick.bind(this, 0) } className={`anim-selector__link${ animationScriptIdx == 0 ? "--selected" : "" }`} href="javascript:void(0);">
                ㅁ
              </a>
            </li>
            <li>
              <a onClick={this.handleClick.bind(this, 1) } className={`anim-selector__link${ animationScriptIdx == 1 ? "--selected" : "" }`} href="javascript:void(0);">
                ㅁ
              </a>
            </li>
            <li>
              <a onClick={this.handleClick.bind(this, 2) } className={`anim-selector__link${ animationScriptIdx == 2 ? "--selected" : "" }`} href="javascript:void(0);">
                ㅁ
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    animationScriptIdx: state.animationScriptIdx
  }
}

export default connect(mapStateToProps)(AnimationScriptSelector);