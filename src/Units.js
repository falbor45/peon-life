import React, {Component} from 'react'
import {connect} from 'react-redux'
import { BigNumber } from 'bignumber.js'
import ReactTooltip from 'react-tooltip'
import pluralize from 'pluralize'
import 'normalize.css'
import './Units.css'
import Info from './assets/info-icon.png'

let mapStateToProps = state => {
  return {
    units: state.units,
    resources: state.resources,
    increments: state.increments,
    errors: state.errors
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

  addUnit = unit => {
    if (this.props.resources.gold.isGreaterThanOrEqualTo(unit.cost.combined) && this.props.units.unitLimit.isGreaterThanOrEqualTo(this.props.units.units.plus(this.props.units.buyQuant))) {
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

  canBuyUnit = unit => this.props.resources.gold.isGreaterThan(unit.cost.combined) &&
    this.props.units.unitLimit.isGreaterThanOrEqualTo(this.props.units.units.plus(this.props.units.buyQuant))


  mapUnit = unit => {
    return (
      <div className="unit-wrapper">
      <div className={`unit ${this.canBuyUnit(unit) ? 'enabled' : 'disabled'}`}
           key={unit.name}
           onClick={() => this.addUnit(unit)}>
          <img src="https://lorempizza.com/64/64" alt="unit icon"/>
          <div className="unit__info">
            <p className="unit__name">{unit.name}</p>
            <p className="unit__cost">{unit.cost.combined.decimalPlaces(0).toString()}</p>
          </div>
        <p className="unit__quantity">{unit.quantity.toString()}</p>
        <div className={`${this.canBuyUnit(unit) ? null : 'unit__overlay--disabled'}`}> </div>
      </div>
        <div data-tip data-for={`${unit.name}-tooltip`}
             className="unit__info-icon">
          <img src={Info} alt="info"/>
          <ReactTooltip effect="solid" id={`${unit.name}-tooltip`}>
            <div className="unit-tooltip">
              <div className="unit-tooltip__icon">
                <img src='https://lorempizza.com/64/64' alt="unit icon"/>
              </div>
              <div className="unit-tooltip__info">
                <p className="unit-tooltip__name">{unit.name}</p>
                <p className="unit-tooltip__owned">(Owned: {unit.quantity.toString()})</p>
              </div>
              <div className="unit-tooltip__cost">
                <p>Cost: {unit.cost.combined.decimalPlaces(0).toString()}</p>
              </div>
            </div>
            <ul className="unit-tooltip__data">
              <li>Each {unit.name.toLowerCase()} produces {unit.efficiency.multipliedBy(this.props.increments.ticksPerSec).toString()} gold per second</li>
              <li>You currently own {unit.quantity.toString()} {unit.quantity === 1 ? unit.name.toLowerCase() : pluralize(unit.name.toLowerCase())}.</li>
              <li>Your {unit.quantity === 1 ? unit.name.toLowerCase() : pluralize(unit.name.toLowerCase())} are producing {unit.quantity.multipliedBy(unit.efficiency).multipliedBy(this.props.increments.ticksPerSec).toString()} gold per second.</li>
            </ul>
          </ReactTooltip>
        </div>
      </div>
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