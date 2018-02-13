import React, {Component} from 'react'
import { connect } from 'react-redux'
import './ResourcesView.css'

let mapStateToProps = state => {
  return {
    resources: state.resources
  }
};

class ResourcesView extends Component {
  render() {
    return (
      <div className="resources">
        <div className="resources__row1">
          <span>Coal: {this.props.resources.coal}</span>
          <span>Wood: {this.props.resources.wood}</span>
          <span>Stone: {this.props.resources.stone}</span>
        </div>
        <div className="resources__row2">
          <span>Iron: {this.props.resources.iron}</span>
          <span>Food: {this.props.resources.food}</span>
          <span>Gold: {this.props.resources.gold}</span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ResourcesView)