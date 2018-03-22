import React, {Component} from 'react'
import { connect } from 'react-redux'
import 'normalize.css'
import './ResourcesView.css'

let mapStateToProps = state => {
  return {
    resources: state.resources,
    increments: state.increments,
    units: state.units
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    setGoldBase: goldBase => dispatch({type: "increments/SET_GOLD_BASE", goldBase}),
    calcIncr: () => dispatch({type: "increments/CALCULATE_INCREMENTS"}),
    incrementGold: gold => dispatch({type: "resources/INCREMENT", gold})
  }
}

class ResourcesView extends Component {

  componentDidMount() {
    this.setState({
      setGoldBaseInt: setInterval(() => {
        this.setGoldBase();
        this.props.calcIncr();
      }, 1000),

      incrementGold: setInterval(() => {
        this.props.incrementGold(this.props.increments.goldIncr)
      }, 1000)
    })
  }


  constructor(props) {
    super(props);

    this.state = {}
  }



  setGoldBase = () => {
    let result = 0;

    for (let unit in this.props.units.data) {
      if (this.props.units.data.hasOwnProperty(unit)) {
        result += this.props.units.data[unit].quantity * this.props.units.data[unit].efficiency;
      }
    }

    this.props.setGoldBase(result);
    return null;
  };

  render() {
    return (
      <div>
        <p className="village-name">Peon's village</p>
        <p className="gold-counter">{this.props.resources.gold} gold</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(ResourcesView)