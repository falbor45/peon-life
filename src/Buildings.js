import React, {Component} from 'react'
import {connect} from 'react-redux'
import Entity from './Entity'
import './Buildings.css'

let mapStateToProps = state => {
  return {
    buildings: state.buildings,
    resources: state.resources,
    increments: state.increments,
    errors: state.errors,
    units: state.units
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

  canBuyBuilding = building => this.props.resources.gold.isGreaterThan(building.cost.combined) && (building.unitBuilding ?
      this.props.units.unitLimit.isGreaterThanOrEqualTo(this.props.units.units.plus(1)) : true);

  addBuilding = building => {
    if (this.canBuyBuilding(building)) {
      this.props.loseGold(building.cost.combined);
      this.props.buildBuilding(building);
      return null;
    }
    if (this.props.resources.gold.isLessThan(building.cost.combined)) {
      this.props.throwError('Error: You do not have enough money for this purchase!');
    }
    if (this.props.units.units.plus(1).isGreaterThan(this.props.units.unitLimit)) {
      this.props.throwError('Error: Such purchase would exceed your unit limit! Consider buying more cottages.')
    }
    return null;
  };


  mapBuilding = building => {
    return (
        <Entity entity={building}
                enabled={this.canBuyBuilding(building)}
                clickEvent={this.addBuilding.bind(this)}
                name={building.name}
                cost={building.cost.combined.decimalPlaces(0).toString()}
                quantity={building.quantity.toString()}
                unit={true}/>
    )
  };

  filterBuilding = building => 0.8 * building.cost.base <= this.props.resources.totalGold;

  filterAndMapBuildings = () => {
    return this.objToArr(this.props.buildings.data).filter(e => this.filterBuilding(e)).map(e => this.mapBuilding(e))
  };

  render() {
    return (
      <div className="buildings__wrapper">
        <div className="buildings__heading">
          <span>Buildings</span>
        </div>
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