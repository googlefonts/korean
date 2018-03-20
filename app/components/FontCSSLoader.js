import React, { Component } from 'react'
import { FONTS } from '../constants/defaults';
import _ from 'lodash';

const Fragment = React.Fragment;

class FontCSSLoader extends Component {
  render() {
    return (
      <Fragment>
        {
          _.map(FONTS, fontData => {
            return (
              <link key={fontData.id} rel="stylesheet" href={fontData.cssUrl} async/>
            )
          })
        }
      </Fragment>
    )
  }
}

export default FontCSSLoader;
