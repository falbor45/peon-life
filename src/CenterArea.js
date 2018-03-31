import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'

let mapStateToProps = state => {
  return {
    resources: state.resources,
    units: state.units,
    increments: state.increments
  }
};

let mapDispatchToProps = dispatch => {
  return {
  }
}

class CenterArea extends Component {
  render() {
    return (
      <div style={{width: '33.33%', display: 'inline-block'}}>
        <p>
          <span style={{fontWeight: 'bold'}}>Total units: </span>
          <span>{this.props.units.units}</span>
        </p>
        <p>
          <span style={{fontWeight: 'bold'}}>Gold per second: </span>
          <span>{this.props.increments.goldIncr}</span>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea)