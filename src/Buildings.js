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

let mapDipsatchToProps = dispatch => {
  return {
    addBuilding: (building, value) => dispatch({type: "buildings/ADD_BUILDING", building, value}),
    loseGold: gold => dispatch({type: "resources/DECREMENT", gold})
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

  addBuilding = (building, value) => {
    if (this.props.resources.gold >= building.cost.combined) {
      this.props.loseGold(building.cost.combined);
      this.props.addBuilding(building.effects[0].building, value);
    }
    return null;
  };


  mapBuilding = building => {
    return (
      <div className="building" key={building.name} onClick={() => this.addBuilding(building, 1)}>
        <div className="building__background"> </div>
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
      <div>
        {
          this.mapBuildings()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(Buildings)