import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'normalize.css'

let mapStateToProps = state => {
  return {
    resources: state.resources
  }
};

let mapDispatchToProps = dispatch => {
  return {
  }
}

class CenterArea extends Component {
  render() {
    return (
      <div style={{width: '33.33%', display: 'inline-block'}}>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterArea)