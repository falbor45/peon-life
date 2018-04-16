import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'
import './Buildings.css'

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
    if (this.props.resources.gold >= building.cost.combined) {
      this.props.loseGold(building.cost.combined);
      this.props.buildBuilding(building);
      return null;
    }
    if (this.props.resources.gold < building.cost.combined) {
      this.props.throwError('Error: You do not have enough money for this purchase!');
    }
    return null;
  };


  mapBuilding = building => {
    return (
      <div className={`building ${this.props.resources.gold < building.cost.combined ? 'disabled' : 'enabled'}`} key={building.name} onClick={() => this.addBuilding(building)}>
        <div className="building__icon"> </div>
        <p className="building__name">{building.name}</p>
        <p className="building__quantity">{building.quantity}</p>
        <p className="building__cost">{building.cost.combined}</p>
        <div className={`${this.props.resources.gold < building.cost.combined ? 'unit__overlay--disabled' : null}`}> </div>
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