import React, { Component } from 'react';

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
    let style = {
      fontFamily: this.props.fontName,
      fontSize: '20.0em',
      fontWeight: this.props.fontWeightSelected,
      border: 'none',
      marginTop: -40,
      marginLeft: -27,
      height: 400,
    };

    return (
      <div style={{ overflow: 'hidden'}}>
        <input value={this.state.msg} type="text" onChange={this.handleChange.bind(this)} style={style} />
      </div>
    );
  }
}

export default FontPreviewTyper;