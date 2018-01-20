import React, { Component } from 'react'
import { FONTS } from '../constants/defaults';
import { FontViewer } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';

class FontsList extends Component {
  render() {
    return (
      <section className="fonts-list">
        {
          _.map(FONTS, (fontData, i) => {
            return (
              <FontViewer key={fontData.id} message={MESSAGES[i]} {...fontData} />
            )
          })
        }
      </section>
    )
  }
}

export default FontsList;