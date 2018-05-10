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
  constructor(props) {
    super(props);

    this.state = {
      viewedComponent: null
    }
  }
  render() {
    return (
      <div className="center-area">
        <div className="view-select">
          <button className={`view-select__button ${this.state.viewedComponent === 'Stats' ? 'view-select__button--active' : null}`}
                  onClick={() => this.setState({viewedComponent: 'Stats'})}>Stats</button>
          <button className={`view-select__button ${this.state.viewedComponent === 'Policies' ? 'view-select__button--active' : null}`}
                  onClick={() => this.setState({viewedComponent: 'Policies'})}>Policies</button>
        </div>
        <div className="view-select__view">
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea)