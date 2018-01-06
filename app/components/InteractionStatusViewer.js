import React, { Component } from 'react'
import { connect } from 'react-redux';

class InteractionStatusViewer extends Component {
  render() {
    return (
      <div className="interaction-status-viewer">
        ㅁㅁㅁㅁㅁㅁㅁㅁㅁ
      </div>
    )
  }
}

let mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(InteractionStatusViewer);