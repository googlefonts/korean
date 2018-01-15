import React, { Component } from 'react'
import * as opentype from 'opentype.js'
import { FontOutlineViewer, FontPreviewTyper, FontDetailViewer } from './';
import { connect } from 'react-redux';
import _ from 'lodash';

class FontViewer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false,
      font: null,
      detailSelected: false,
      fontWeightSelected: null
    }
  }

  componentDidMount(){
    
    opentype.load(this.props.fontUrl, (err, font) => {
      
      if (err) {

        console.log(err);

      } else {

        this.setState({
          loaded: true,
          font: font,
          fontWeightSelected: !_.isNull(_.first(this.props.weights).fontWeight) ? _.first(this.props.weights).fontWeight : 400
        });
      
      }

    });


  }

  handleDetailSelectedClick(e){
    this.setState({
      detailSelected: true
    });
  }

  handleWeightSelectedClick(weightData){
    this.setState({
      fontWeightSelected: weightData.fontWeight
    });
  }

  handleClosed(e){
    this.setState({
      detailSelected: false
    }) 
  }

  render() {
    let { currentViewFont } = this.props;
    let selected = currentViewFont == this.props.id;
    let { detailSelected } = this.state;

    return (
      <div className={`font-viewer${ selected ? "--selected" : "" }`} data-id={this.props.id}>
        <div className="font-viewer__flex-wrapper">
          <div>
            <h3>
              <span className="ko">{ this.props.nameKo }</span><br/>
              { this.props.nameEn }
            </h3>

            <div className="font-viewer__weight-area">
              {
                !detailSelected ? 
                <a href="javascript:void(0);" onClick={this.handleDetailSelectedClick.bind(this)}>
                  <img src="./public/assets/arrow_down.svg" alt="arrow_down" />
                </a>
                :
                <ul className="font-viewer__weights">
                  {
                    _.map(this.props.weights, weightData => {
                      return (
                        <li key={weightData.fontWeight}>
                          <a href="javascript:void(0);" onClick={this.handleWeightSelectedClick.bind(this, weightData)}>
                            { weightData.fontWeight == this.state.fontWeightSelected ?  "— " : "" }{ weightData.weightName }
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
              }
            </div>
          </div>

          {
            this.state.loaded ? 
              ( 
                detailSelected ?
                <FontPreviewTyper {...this.props} fontWeightSelected={this.state.fontWeightSelected} />
                  : 
                <FontOutlineViewer font={ this.state.font } />
              ) :
              <div>
                loading...
              </div>          
          }
        </div>


        {
          detailSelected ? 
          <div className="font-viewer__flex-wrapper">
            <FontDetailViewer {...this.props} handleClosed={this.handleClosed.bind(this)} />
          </div> : null
        }
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    currentViewFont: state.currentViewFont
  }
};

export default connect(mapStateToProps)(FontViewer);