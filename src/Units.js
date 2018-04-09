import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'
import './Units.css'

let mapStateToProps = state => {
  return {
    units: state.units,
    resources: state.resources,
    increments: state.increments
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    addWorker: (worker, value) => dispatch({type: "units/ADD_WORKER", worker, value}),
    loseGold: gold => dispatch({type: "resources/DECREMENT", gold}),
    setGoldBase: goldBase => dispatch({type: "increments/SET_GOLD_BASE", goldBase}),
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

  addWorker = (worker, value) => {
    if (this.props.resources.gold >= worker.cost.combined && this.props.units.unitLimit >= this.props.units.units + 1) {
      this.props.loseGold(worker.cost.combined);
      this.props.addWorker(worker.effects[0].worker, value);
    }
    return null;
  };


  mapUnit = unit => {
    return (
      <div className="unit" key={unit.name} onClick={() => this.addWorker(unit, 1)}>
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