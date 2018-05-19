import React, {Component} from 'react'
import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
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
    timeTick: () => dispatch({type: "time/TIME_TICK"}),
    increaseExperience: value => dispatch({type: "experience/INCREASE_EXPERIENCE", value}),
    pillage: (times, gold) => dispatch({type: "resources/PILLAGE", times, gold})
  }
}

class ResourcesView extends Component {
  componentDidMount() {
    this.timeTick = setInterval(() => {
      this.props.timeTick();
      this.props.incrementGold(this.props.increments.goldIncr);
      this.setGoldBase();
      this.props.calcIncr(this.props.happiness.productionBonus);
      this.props.increaseExperience(this.props.increments.goldIncr);
      this.pillage();
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

  pillage = () => {
    let goldToBePillaged = () => {
      let {hour, day, month, year} = this.props.time.date;
      return hour.plus(day.multipliedBy(24)).plus(month.multipliedBy(30)).plus(year.multipliedBy(300));
    };
    let pillageChance = this.props.resources.pillageChance.multipliedBy(100);
    let strippedChance = pillageChance.mod(100);
    let rollUncertainPillage = new BigNumber.random().multipliedBy(100).isLessThanOrEqualTo(strippedChance) ? new BigNumber(1) : new BigNumber(0);
    let timesToBeCalled = pillageChance.dividedBy(100).decimalPlaces(0).plus(rollUncertainPillage).toNumber();
    this.props.pillage(timesToBeCalled, goldToBePillaged());
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