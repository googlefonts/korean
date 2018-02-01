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
    let { category, screenWidth } = this.props;
    let catStyle;

    if (category === 3) {

      if (screenWidth > BODY_600){

        catStyle = {
          marginTop: -20,
          marginLeft: 0,
          fontSize: '10.0em',
          height: 200
        }

      
      } else if (screenWidth <= BODY_600 && screenWidth > BODY_480) {
        
        catStyle = {
          marginTop: -30,
          marginLeft: -10,
          fontSize: '15.0em',
          height: 300
        }
      
      } else {

        catStyle = {
          marginTop: -40,
          marginLeft: -27,
          fontSize: '20.0em',
          height: 400
        }

      }

    } else {
      
      catStyle = {
        marginTop: -40,
        marginLeft: -27,
        fontSize: '20.0em',
        height: 400
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