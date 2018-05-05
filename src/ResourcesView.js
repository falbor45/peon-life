import React, {Component} from 'react'
import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
import 'normalize.css'
import './ResourcesView.css'

let mapStateToProps = state => {
  return {
    resources: state.resources,
    increments: state.increments,
    units: state.units,
    happiness: state.happiness,
    time: state.time
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    setGoldBase: goldBase => dispatch({type: "increments/SET_GOLD_BASE", goldBase}),
    calcIncr: productionBonus => dispatch({type: "increments/CALCULATE_INCREMENTS", productionBonus}),
    incrementGold: gold => dispatch({type: "resources/INCREMENT", gold}),
    timeTick: () => dispatch({type: "time/TIME_TICK"})
  }
}

class ResourcesView extends Component {
  componentDidMount() {
    this.timeTick = setInterval(() => {
      this.props.timeTick();
    }, this.props.time.hourDuration);

    this.setGoldBaseInt = setInterval(() => {
      this.setGoldBase();
      this.props.calcIncr(this.props.happiness.productionBonus.toString());
    }, this.props.time.hourDuration);

    this.incrementGold = setInterval(() => {
      this.props.incrementGold(this.props.increments.goldIncr.toString());
    }, this.props.time.hourDuration);
  }

  setGoldBase = () => {
    let result = new BigNumber(0);

    for (let unit in this.props.units.data) {
      if (this.props.units.data.hasOwnProperty(unit)) {
        result = result.plus(this.props.units.data[unit].quantity.multipliedBy(this.props.units.data[unit].efficiency));
      }
    }

    this.props.setGoldBase(result);
    return null;
  };

  render() {
    return (
      <div>
        <p className="village-name">Peon's village</p>
        <p className="gold-counter">
          {this.props.resources.gold.decimalPlaces(0).toString()} gold
        <span>per second: {this.props.increments.goldIncr.toString()}</span>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(ResourcesView)