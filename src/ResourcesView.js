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
    happiness: state.happiness
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    setGoldBase: goldBase => dispatch({type: "increments/SET_GOLD_BASE", goldBase}),
    calcIncr: productionBonus => dispatch({type: "increments/CALCULATE_INCREMENTS", productionBonus}),
    incrementGold: gold => dispatch({type: "resources/INCREMENT", gold})
  }
}

class ResourcesView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      setGoldBaseInt: () => {
        setTimeout(() => {
          this.setGoldBase();
          this.props.calcIncr(this.props.happiness.productionBonus.toNumber());
          this.state.setGoldBaseInt();
        }, 1000 / this.props.increments.ticksPerSec)
      },

      incrementGold: () => {
        setTimeout(() => {
          this.props.incrementGold(this.props.increments.goldIncr.toNumber());
          this.state.incrementGold();
        }, 1000 / this.props.increments.ticksPerSec)
      }
    }

    this.state.setGoldBaseInt();
    this.state.incrementGold();
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