import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BODY_480, BODY_600 } from '../constants/defaults';

class FontPreviewTyper extends Component {
  constructor(props){
    super(props);

    this.state = {
      msg: "",
      userUpdated: false
    };
  }

  componentDidMount(){
    this.updateMsg(this.props);
  }

  componentWillReceiveProps(newProps){
    this.updateMsg(newProps);
  }

  updateMsg(props){
    let { message } = this.props;

    if (!this.state.userUpdated){
      
      this.setState({
        msg: message
      });

    }
  }

  handleChange(e){
    this.setState({
      userUpdated: true,
      msg: e.value
    });
  }

  render() {
    let { category, screenWidth, size, containerHeight } = this.props;
    let catStyle;

    if (category === 3) {

      if (screenWidth > BODY_600){

        catStyle = {
          marginTop: -20,
          marginLeft: 0,
          fontSize: '10.0em',
          height: 200,
          paddingBottom: 40
        }

      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {
        
        catStyle = {
          marginTop: -20,
          marginLeft: 0,
          fontSize: '15.0em',
          height: 300,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 40
        }
      
      } else {

        catStyle = {
          marginTop: 0,
          marginLeft: 0,
          fontSize: '20.0em',
          height: 400,
          width: '100%',
          textAlign: 'center',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0
        }

      }

    } else {
      

      if (screenWidth < BODY_480) {
        catStyle = {
          marginTop: 0,
          marginLeft: 0,
          fontSize: size,
          height: containerHeight,
          width: '100%',
          textAlign: 'center',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 40
        }
      } else {
        catStyle = {
          marginTop: 0,
          marginLeft: 0,
          fontSize: size,
          height: containerHeight,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 15,
          paddingBottom: 40
        }  
      }
      
    
    }

    let style = {
      ...catStyle,
      fontFamily: this.props.fontName,
      fontWeight: this.props.fontWeightSelected,
      border: 'none'
    };

    return (
      <div style={{ overflow: 'hidden'}}>
        <input value={this.state.msg} type="text" onChange={this.handleChange.bind(this)} style={style} />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth
  }
};

export default connect(mapStateToProps)(FontPreviewTyper);