import React, {Component} from 'react'
import { connect } from 'react-redux'
import 'normalize.css'
import './ResourcesView.css'

let mapStateToProps = state => {
  return {
    resources: state.resources
  }
};

class ResourcesView extends Component {
  render() {
    return (
      <div>
        <p className="village-name">Peon's village</p>
        <p className="gold-counter">{this.props.resources.gold} gold</p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ResourcesView)