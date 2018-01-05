import React, { Component } from 'react'
import { FONTS } from '../constants/defaults';
import { FontViewer } from './';
import _ from 'lodash';

class FontsList extends Component {
  render() {
    return (
      <section className="fonts-list">
        {
          _.map(FONTS, fontData => {
            return (
              <FontViewer key={fontData.id} {...fontData} />
            )
          })
        }
      </section>
    )
  }
}

export default FontsList;