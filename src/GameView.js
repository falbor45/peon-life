import React, {Component} from 'react'
import { connect } from 'react-redux'
import Swipe from 'react-easy-swipe'
import ResourcesBar from './ResourcesView'
import Loader from './Loader'
import Units from './Units'
import CenterArea from './CenterArea'
import Buildings from './Buildings'
import MediaQuery from 'react-responsive'

let mapStateToProps = state => {
  return {
    units: state.units,
    buildings: state.buildings
  }
};

let mapDipsatchToProps = dispatch => {
  return {
    unitsFetchBegin: () => dispatch({type: 'units/FETCH_BEGIN'}),
    unitsFetchFail: error => dispatch({type: 'units/FETCH_FAIL', error}),
    unitsFetchSuccess: data => dispatch({type: 'units/FETCH_SUCCESS', data}),
    unitsSetSettings: data => dispatch({type: 'units/SET_SETTINGS', data}),
    buildingsFetchBegin: () => dispatch({type: 'buildings/FETCH_BEGIN'}),
    buildingsFetchFail: error => dispatch({type: 'buildings/FETCH_FAIL', error}),
    buildingsFetchSuccess: data => dispatch({type: 'buildings/FETCH_SUCCESS', data}),
    buildingsSetSettings: data => dispatch({type: 'buildings/SET_SETTINGS', data})
  }
}

class GameView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      components: ['units', 'centerArea', 'buildings'],
      viewedComponent: 1,
      wasComponentSwiped: false
    }
  }

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

  onSwipeStart(event) {

  }

  onSwipeMove(position, event) {
    if (position.x - position.y > 150 && this.state.wasComponentSwiped === false) {
      this.setState({
        viewedComponent: this.state.viewedComponent + 1 > 2 ? this.state.viewedComponent : this.state.viewedComponent + 1,
        wasComponentSwiped: true
      })
    }
    if (position.x - position.y < -150 && this.state.wasComponentSwiped === false) {
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
        {this.props.units.data !== null && this.props.buildings.data !== null ? (
          <div>
            <ResourcesBar/>
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
              <MediaQuery query="(min-device-width: 961px)">
                <Units/>
                <CenterArea/>
                <Buildings/>
              </MediaQuery>
              <MediaQuery query="(max-device-width: 960px)">
                <Swipe
                  style={{height: '100vh'}}
                  onSwipeStart={this.onSwipeStart.bind(this)}
                  onSwipeMove={this.onSwipeMove.bind(this)}
                  onSwipeEnd={this.onSwipeEnd.bind(this)}>
                  {
                    this.state.components[this.state.viewedComponent] === 'units' ?
                      <Units/> : null
                  }
                  {
                    this.state.components[this.state.viewedComponent] === 'centerArea' ?
                      <CenterArea/> : null
                  }
                  {
                    this.state.components[this.state.viewedComponent] === 'buildings' ?
                      <Buildings/> : null
                  }
                </Swipe>
              </MediaQuery>
            </div>
          </div>
        ) : <Loader/>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(GameView)