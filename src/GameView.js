import React, {Component} from 'react'
import { connect } from 'react-redux'
import Swipe from 'react-easy-swipe'
import ResourcesBar from './ResourcesView'

let mapStateToProps = state => {
  return {
    units: state.units,
    buildings: state.buildings
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    unitsFetchBegin: () => dispatch({type: 'units/FETCH_BEGIN'}),
    unitsFetchFail: () => dispatch({type: 'units/FETCH_FAIL'}),
    unitsFetchSuccess: () => dispatch({type: 'units/FETCH_SUCCESS'}),
    unitsSetSettings: data => dispatch({type: 'units/SET_SETTINGS', data}),
    buildingsFetchBegin: () => dispatch({type: 'buildings/FETCH_BEGIN'}),
    buildingsFetchFail: () => dispatch({type: 'buildings/FETCH_FAIL'}),
    buildingsFetchSuccess: () => dispatch({type: 'buildings/FETCH_SUCCESS'}),
    buildingsSetSettings: data => dispatch({type: 'buildings/SET_SETTINGS', data})
  }
}

class GameView extends Component {

  componentWillMount() {
    this.props.unitsFetchBegin()
    fetch(
      `${process.env.PUBLIC_URL}/data/units.json`
    ).then(
      response => response.json().then(
        data => {
          this.props.unitsFetchSuccess(data);
          this.props.unitsSetSettings(data);
        }
      ).catch(
        error => this.props.unitsFetchFail('Malformed JSON!')
      )
    ).catch(
      error => this.props.unitsFetchFail('Connection error!')
    )

    this.props.buildingsFetchBegin()
    fetch(
      `${process.env.PUBLIC_URL}/data/buildings.json`
    ).then(
      response => response.json().then(
        data => {
          this.props.buildingsFetchSuccess(data);
          this.props.buildingsSetSettings(data);
        }
      ).catch(
        error => this.props.buildingsFetchFail('Malformed JSON!')
      )
    ).catch(
      error => this.props.buildingsFetchFail('Connection error!')
    )
  }


  constructor(props) {
    super(props);

    this.state = {
      components: ['units', 'mainView', 'buildings'],
      viewedComponent: 1,
      wasComponentSwiped: false
    }
  }

  onSwipeStart(event) {

  }

  onSwipeMove(position, event) {
    if (position.x - position.y > 150 && this.state.wasComponentSwiped === false) {
      console.log('prawo')
      this.setState({
        viewedComponent: this.state.viewedComponent + 1 > 2 ? this.state.viewedComponent : this.state.viewedComponent + 1,
        wasComponentSwiped: true
      })
    }
    if (position.x - position.y < -150 && this.state.wasComponentSwiped === false) {
      console.log('left')
      this.setState({
        viewedComponent: this.state.viewedComponent - 1 < 0 ? this.state.viewedComponent : this.state.viewedComponent - 1,
        wasComponentSwiped: true
      })
    }
  }

  onSwipeEnd(event) {
    this.setState({
      wasComponentSwiped: false
    })
  }

  render() {
    return (
      <div>
        <ResourcesBar/>
        <Swipe
          onSwipeStart={this.onSwipeStart.bind(this)}
          onSwipeMove={this.onSwipeMove.bind(this)}
          onSwipeEnd={this.onSwipeEnd.bind(this)}>
        </Swipe>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(GameView)