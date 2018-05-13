import React, {Component} from 'react'
import {connect} from 'react-redux'
import { BigNumber } from 'bignumber.js'
import './CenterArea.css'
import Stats from './Stats'
import Policies from './Policies'

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
      viewedComponent: []
    }
  }
  render() {
    return (
      <div className="center-area">
        <div className="view-select">
          <button className={`view-select__button ${this.state.viewedComponent[0] === 'Stats' ? 'view-select__button--active' : null}`}
                  onClick={() => this.setState({viewedComponent: ['Stats', <Stats/>]})}>Stats</button>
          <button className={`view-select__button ${this.state.viewedComponent[0] === 'Policies' ? 'view-select__button--active' : null}`}
                  onClick={() => this.setState({viewedComponent: ['Policies', <Policies/>]})}>Policies</button>
        </div>
        <div className="view-select__view">
          {
            this.state.viewedComponent[1]
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea)