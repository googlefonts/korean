import React, { Component } from 'react';

class FontPreviewTyper extends Component {
  render() {
    let style = {
      fontFamily: this.props.fontName,
      fontSize: '20.0em',
      fontWeight: this.props.fontWeightSelected,
      border: 'none',
      marginTop: -40,
      marginLeft: -27,
      height: 400
    };

    return (
      <div style={{ overflow: 'hidden'}}>
        <input defaultValue={this.props.message} type="text" style={style} />
      </div>
    );
  }
}

export default FontPreviewTyper;