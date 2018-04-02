import React, { Component } from 'react';
import { connect } from 'react-redux';

class HeaderGutter extends Component {
  render() {
    let { headerHeight } = this.props;

    return (      
      <div className="header-gutter" style={{ height: headerHeight - 60 }}>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    headerHeight: state.headerHeight
  }
}

export default connect(mapStateToProps)(HeaderGutter);