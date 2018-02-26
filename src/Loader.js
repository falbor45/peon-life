import React, { Component } from 'react'
import './Loader.css'

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="loader__circle"></div>
      </div>
    )
  }
}