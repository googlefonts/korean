import React, { Component } from 'react'

class FontViewer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false
    }
  }

  render() {
    return (
      <div className="font-viewer">
        <h3>
          { this.props.nameKo }<br/>
          { this.props.nameEn }
        </h3>
      </div>
    )
  }
}

export default FontViewer;