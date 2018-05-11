import React, { Component } from 'react'
import './Listing.css'
import Coin from './assets/gold-coin.png'

export default class Listing extends Component {
  render() {
    return (
      <p className="listing">
        {this.props.textLeft}
        {
          this.props.goldIcon === true ?
            <img src={Coin} className="listing-icon"/> : null
        }
        <span className="listing-value">
          {this.props.textRight}
        </span>
      </p>
    )
  }
}