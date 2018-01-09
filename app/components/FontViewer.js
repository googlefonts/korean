import React, { Component } from 'react'
import * as opentype from 'opentype.js'

class FontViewer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    
    opentype.load(this.props.fontUrl, (err, font) => {
      
      if (err) {

        console.log(err);

      } else {

        this.setState({
          loaded: true
        });

        let path = font.getPath('배현진', 0, 150, 72);

        // // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).
        // path.draw(ctx);
      
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
          null : 
          <div>
            loading...
          </div>
        }
      </div>
    )
  }
}

export default FontViewer;