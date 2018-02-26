import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAnimationScriptIdx } from '../actions';

class AnimationScriptSelector extends Component {
  handleClick(idx, e){
    
    e.stopPropagation();
    this.props.dispatch(changeAnimationScriptIdx(idx));
  }

  render() {
    let { animationScriptIdx, backgroundMode } = this.props;

    return (
      <div className="anim-selector">
        <a onClick={this.handleClick.bind(this, 0) } className={`anim-selector__link${ animationScriptIdx == 0 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef3_${backgroundMode}.svg`} />
        </a>
        <a onClick={this.handleClick.bind(this, 1) } className={`anim-selector__link${ animationScriptIdx == 1 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef7_${backgroundMode}.svg`} />
        </a>
        <a onClick={this.handleClick.bind(this, 2) } className={`anim-selector__link${ animationScriptIdx == 2 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef6_${backgroundMode}.svg`} />
        </a>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode,
    animationScriptIdx: state.animationScriptIdx
  }
}

export default connect(mapStateToProps)(AnimationScriptSelector);