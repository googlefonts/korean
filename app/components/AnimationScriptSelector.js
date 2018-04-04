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
        <a onClick={ this.handleClick.bind(this, 0) } className={`anim-selector__link`} href="javascript:void(0);">
          <img src={`./public/assets/ef3_${backgroundMode}${ animationScriptIdx == 0 ? "_selected" : "" }.svg`} />
        </a>
        <a onClick={ this.handleClick.bind(this, 1) } className={`anim-selector__link`} href="javascript:void(0);">
          <img src={`./public/assets/ef7_${backgroundMode}${ animationScriptIdx == 1 ? "_selected" : "" }.svg`} />
        </a>
        <a onClick={ this.handleClick.bind(this, 2) } className={`anim-selector__link`} href="javascript:void(0);">
          <img src={`./public/assets/ef6_${backgroundMode}${ animationScriptIdx == 2 ? "_selected" : "" }.svg`} />
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