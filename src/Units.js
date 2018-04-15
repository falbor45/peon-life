import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'
import './Units.css'

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
    if (this.props.resources.gold >= unit.cost.combined && this.props.units.unitLimit >= this.props.units.units + unit.effects[0].value) {
      this.props.loseGold(unit.cost.combined);
      this.props.addUnit(unit);
      return null;
    }
    if (this.props.resources.gold < unit.cost.combined) {
      this.props.throwError('Error: You do not have enough money for this purchase!');
    }
    if (this.props.units.unitLimit < this.props.units.units + unit.effects[0].value) {
      this.props.throwError('Error: Such purchase would exceed your unit limit! Consider buying more cottages.');
    }
    return null;
  };


  mapUnit = unit => {
    return (
      <div className="unit" key={unit.name} onClick={() => this.addUnit(unit)}>
        <div className="unit__icon"> </div>
        <p className="unit__name">{unit.name}</p>
        <p className="unit__quantity">{unit.quantity}</p>
        <p className="unit__cost">{unit.cost.combined}</p>
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