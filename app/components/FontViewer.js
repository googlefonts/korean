import React, { Component } from 'react'
import * as opentype from 'opentype.js'
import { FontOutlineViewer } from './';

class FontViewer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false,
      font: null
    }
  }

  componentDidMount(){
    
    opentype.load(this.props.fontUrl, (err, font) => {
      
      if (err) {

        console.log(err);

      } else {

        this.setState({
          loaded: true,
          font: font
        });
      
      }

    });

  }

  render() {
    return (
      <div className="font-viewer">
        <h3>
          { this.props.nameKo }<br/>
          { this.props.nameEn }
        </h3>

        {
          this.state.loaded ? 
          <FontOutlineViewer font={ this.state.font } /> : 
          <div>
            loading...
          </div>
        }
      </div>
    )
  }
}

export default FontViewer;