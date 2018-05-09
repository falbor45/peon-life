import React, { Component } from 'react'
import './ProgressBar.css'

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{width: this.props.fill}}>
        </div>
        <p className="progress-bar__text">{this.props.text}</p>
      </div>
    )
  }
}