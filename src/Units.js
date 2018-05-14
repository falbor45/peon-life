import React, {Component} from 'react'
import {connect} from 'react-redux'
import { BigNumber } from 'bignumber.js'
import Entity from './Entity'
import './Units.css'

let mapStateToProps = state => {
  return {
    units: state.units,
    resources: state.resources,
    increments: state.increments,
    errors: state.errors,
    time: state.time
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    loseGold: gold => dispatch({type: "resources/DECREMENT", gold}),
    setGoldBase: goldBase => dispatch({type: "increments/SET_GOLD_BASE", goldBase}),
    throwError: error => dispatch({type: "errors/SET_ERROR", error}),
    changeBuyQuant: value => dispatch({type: "units/CHANGE_BUY_QUANT", value}),
    addUnit: unit => {
      for (let i = 0; i < unit.effects.length; i++) {
        dispatch(unit.effects[i]);
        dispatch({type: "happiness/CALCULATE_VALUE"});
      }
    }
  }
};

class Units extends Component {
  objToArr = object => {
    let result = [];
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        result.push(object[prop]);
      }
    }

    return result
  };

  canBuyUnit = unit => this.props.resources.gold.isGreaterThan(unit.cost.combined) &&
    this.props.units.unitLimit.isGreaterThanOrEqualTo(this.props.units.units.plus(this.props.units.buyQuant))

  addUnit = unit => {
    if (this.canBuyUnit(unit)) {
      this.props.loseGold(unit.cost.combined);
      this.props.addUnit(unit);
      return null;
    }
    if (this.props.resources.gold.isLessThan(unit.cost.combined)) {
      this.props.throwError('Error: You do not have enough money for this purchase!');
    }
    if (this.props.units.unitLimit.isLessThan(this.props.units.units.plus(this.props.units.buyQuant))) {
      this.props.throwError('Error: Such purchase would exceed your unit limit! Consider buying more cottages.');
    }
    return null;
  };



  mapUnit = unit => {
    let calculateUnitYield = (unit, single) => {
      if (single) {
        return unit.efficiency.multipliedBy(new BigNumber(1000).dividedBy(this.props.time.hourDuration)).toString()
      }
      return unit.quantity.multipliedBy(unit.efficiency).multipliedBy(new BigNumber(1000).dividedBy(this.props.time.hourDuration)).toString()
    }
    return (
        <Entity entity={unit}
                enabled={this.canBuyUnit(unit)}
                clickEvent={this.addUnit.bind(this)}
                name={unit.name}
                cost={unit.cost.combined.decimalPlaces(0).toString()}
                quantity={unit.quantity.toString()}
                unitYieldS={calculateUnitYield(unit, true)}
                unitYieldM={calculateUnitYield(unit, false)}
                unit={true}/>
    )
  };

  filterUnit = unit => unit.unlocked;

  filterAndMapUnits = () => {
    return this.objToArr(this.props.units.data).filter(e => this.filterUnit(e)).map(e => this.mapUnit(e))
  };

  render() {
    return (
      <div className="units__wrapper">
        <h1>Units</h1>
        <div className="units__quantity-select">
          <span>BUY</span>
          <button className={this.props.units.buyQuant.toString() === '1' ? "units__quantity-button--active" : null} onClick={() => this.props.changeBuyQuant(1)}>x1</button>
          <button className={this.props.units.buyQuant.toString() === '10' ? "units__quantity-button--active" : null} onClick={() => this.props.changeBuyQuant(10)}>x10</button>
          <button className={this.props.units.buyQuant.toString() === '100' ? "units__quantity-button--active" : null} onClick={() => this.props.changeBuyQuant(100)}>x100</button>
        </div>
        <div className="units">
          {
            this.filterAndMapUnits()
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(Units)