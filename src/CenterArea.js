import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'
import './CenterArea.css'

let mapStateToProps = state => {
  return {
    resources: state.resources,
    units: state.units,
    increments: state.increments,
    happiness: state.happiness
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
        <p>
          <span className="center-area__info">Total units: </span>
          <span>{this.props.units.units} / {this.props.units.unitLimit}</span>
        </p>
        <p>
          <span className="center-area__info">Ticks per second: </span>
          <span>{this.props.increments.ticksPerSec.toNumber()}</span>
        </p>
        <p>
          <span className="center-area__info">Happiness: </span>
          <span>{this.props.happiness.value.toNumber()}</span>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea)