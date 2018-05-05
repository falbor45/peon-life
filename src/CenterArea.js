import React, {Component} from 'react'
import {connect} from 'react-redux'
import { BigNumber } from 'bignumber.js'
import 'normalize.css'
import './CenterArea.css'

let mapStateToProps = state => {
  return {
    resources: state.resources,
    units: state.units,
    increments: state.increments,
    happiness: state.happiness,
    time: state.time
  }
};

let mapDispatchToProps = dispatch => {
  return {
  }
}

class CenterArea extends Component {
  render() {
    return (
      <div className="center-area">
        <p className="center-area__info">
          <span>Year {this.props.time.date.year.toString()} Month {this.props.time.date.month.toString()} Day {this.props.time.date.day.toString()}</span>
        </p>
        <p>
          <span className="center-area__info">Total units: </span>
          <span>{this.props.units.units.toString()} / {this.props.units.unitLimit.toString()}</span>
        </p>
        <p>
          <span className="center-area__info">Hour duration: </span>
          <span>{this.props.time.hourDuration.dividedBy(1000).decimalPlaces(2).toString()}s</span>
        </p>
        <p>
          <span className="center-area__info">Happiness: </span>
          <span>{this.props.happiness.value.toString()}</span>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea)