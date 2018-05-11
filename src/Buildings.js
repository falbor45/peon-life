import React, {Component} from 'react'
import {connect} from 'react-redux'
import { BigNumber } from 'bignumber.js'
import ReactTooltip from 'react-tooltip'
import pluralize from 'pluralize'
import './Buildings.css'
import Info from './assets/info-icon.png'
import Cost from './assets/gold-coin.png'

let mapStateToProps = state => {
  return {
    buildings: state.buildings,
    resources: state.resources,
    increments: state.increments,
    errors: state.errors
  }
};

let mapDispatchToProps = dispatch => {
  return {
    loseGold: gold => dispatch({type: "resources/DECREMENT", gold}),
    throwError: error => dispatch({type: "errors/SET_ERROR", error}),
    changeBuyQuant: value => dispatch({type: "buildings/CHANGE_BUY_QUANT", value}),
    buildBuilding: building => {
      for (let i = 0; i < building.effects.length; i++) {
        dispatch(building.effects[i]);
      }
    }
  }
};

class Buildings extends Component {
  objToArr = object => {
    let result = [];
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        result.push(object[prop]);
      }
    }

    return result
  };

  addBuilding = building => {
    if (this.props.resources.gold.isGreaterThanOrEqualTo(building.cost.combined)) {
      this.props.loseGold(building.cost.combined);
      this.props.buildBuilding(building);
      return null;
    }
    if (this.props.resources.gold.isLessThan(building.cost.combined)) {
      this.props.throwError('Error: You do not have enough money for this purchase!');
    }
    return null;
  };


  mapBuilding = building => {
    return (
      <div className="building-wrapper">
      <div className={`building ${this.props.resources.gold.isLessThan(building.cost.combined) ?
                      'disabled' : 'enabled'}`}
           key={building.name}
           onClick={() => this.addBuilding(building)}>
        <img src="https://lorempizza.com/64/64" alt="building icon"/>
        <div className="building__info">
          <p className="building__name">{building.name}</p>
          <p className="building__cost">
            <img src={Cost} className="building-cost__image" alt="coin"/>
            {building.cost.combined.decimalPlaces(0).toString()}
          </p>
        </div>
        <p className="building__quantity">{building.quantity.toString()}</p>
        <div className={`${this.props.resources.gold.isLessThan(building.cost.combined) ? 'building__overlay--disabled' : null}`}> </div>
      </div>
        <div data-tip data-for={`${building.name}-tooltip`}
             className="building__info-icon">
          <img src={Info} alt="info"/>
          <ReactTooltip effect="solid" id={`${building.name}-tooltip`}>
            <div className="building-tooltip">
              <div className="building-tooltip__icon">
                <img src='https://lorempizza.com/64/64' alt='building icon'/>
              </div>
              <div className="building-tooltip__info">
                <p className="building-tooltip__name">{building.name}</p>
                <p className="building-tooltip__owned">(Owned: {building.quantity.toString()})</p>
              </div>
              <div className="building-tooltip__cost">
                <p>
                  <img src={Cost} className="building-cost__image" alt="coin"/>
                  {building.cost.combined.decimalPlaces(0).toString()}
                </p>
              </div>
            </div>
            <ul className="building-tooltip__data">
              {building.description.map(e =>
                <li>{e}</li>
              )}
              <li>You currently own {building.quantity.toString()} {building.quantity === 1 ? building.name.toLowerCase() : pluralize(building.name.toLowerCase())}.</li>
            </ul>
          </ReactTooltip>
        </div>
      </div>
    )
  };

  filterBuilding = building => 0.8 * building.cost.base <= this.props.resources.totalGold;

  filterAndMapBuildings = () => {
    return this.objToArr(this.props.buildings.data).filter(e => this.filterBuilding(e)).map(e => this.mapBuilding(e))
  };

  render() {
    return (
      <div className="buildings__wrapper">
        <h1>Buildings</h1>
        <div className="buildings__quantity-select">
          <span>BUY</span>
          <button className={this.props.buildings.buyQuant.toString() === '1' ? "buildings__quantity-button--active" : null} onClick={() => this.props.changeBuyQuant(1)}>x1</button>
          <button className={this.props.buildings.buyQuant.toString() === '10' ? "buildings__quantity-button--active" : null} onClick={() => this.props.changeBuyQuant(10)}>x10</button>
          <button className={this.props.buildings.buyQuant.toString() === '100' ? "buildings__quantity-button--active" : null} onClick={() => this.props.changeBuyQuant(100)}>x100</button>
        </div>
        <div className="buildings">
          {
            this.filterAndMapBuildings()
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buildings)