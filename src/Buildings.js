import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'
import './Buildings.css'

let mapStateToProps = state => {
  return {
    buildings: state.buildings,
    resources: state.resources,
    increments: state.increments
  }
};

let mapDispatchToProps = dispatch => {
  return {
    loseGold: gold => dispatch({type: "resources/DECREMENT", gold}),
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
      this.props.buildBuilding(building)
    }
    return null;
  };


  mapBuilding = building => {
    return (
      <div className="building" key={building.name} onClick={() => this.addBuilding(building)}>
        <div className="building__icon"> </div>
        <p className="building__name">{building.name}</p>
        <p className="building__quantity">{building.quantity}</p>
        <p className="building__cost">{building.cost.combined}</p>
      </div>
    )
  };

  mapBuildings = () => {
    return this.objToArr(this.props.buildings.data).map(e => this.mapBuilding(e))
  };

  render() {
    return (
      <div className="buildings__wrapper">
        <div className="buildings">
          {
            this.mapBuildings()
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buildings)