import React, { Component } from 'react';

const Fragment = React.Fragment;

class FontDetailViewer extends Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Fragment>
        <div className="font-viewer__detail-left">
          <a href="javascript:void(0);" onClick={this.props.handleClosed}>
            <img src="./public/assets/arrow_close.svg" alt="arrow_close" />
          </a>

        </div>
        <div className="font-viewer__detail-right">
          <div className="font-viewer__column">
            <p>
              { this.props.description }
            </p>
            <div className="l-apple-box"></div>
            <p>
              제작 <span className="bold">{ this.props.foundryKo }</span>
            </p>
          </div>
          <div className="font-viewer__column">
            <div>
              <div>
                HTML
              </div>
              <div>

              </div>
            </div>

            <div>
              <div>
                CSS
              </div>
              <div>
                
              </div>
            </div>

            <div>
              <div>
                굵기추가
              </div>
              <div>
                {
                  _.map(this.props.weights, weightData => {
                    return (
                      <a href="javascript:void(0);" key={weightData.fontWeight}>
                        { weightData.weightName }
                      </a>
                    )
                  })
                }
              </div>
            </div>

          </div>

        </div>
      </Fragment>
    );
  }
}

export default FontDetailViewer;