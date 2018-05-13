import React, {Component} from 'react'
import { connect } from 'react-redux'
import JSONBigNumber from 'json-bignumber'
import Swipe from 'react-easy-swipe'
import ResourcesBar from './ResourcesView'
import Loader from './Loader'
import Units from './Units'
import CenterArea from './CenterArea'
import Buildings from './Buildings'
import Errors from './Errors'
import MediaQuery from 'react-responsive'
import './GameView.css'

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
    buildingsSetSettings: data => dispatch({type: 'buildings/SET_SETTINGS', data}),
    attributesFetchBegin: () => dispatch({type: 'attributes/FETCH_BEGIN'}),
    attributesFetchFail: error => dispatch({type: 'attributes/FETCH_FAIL', error}),
    attributesFetchSuccess: data => dispatch({type: 'attributes/FETCH_SUCCESS', data}),
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
    ).then(response => response.json()
    ).then(json => JSON.stringify(json)
    ).then(string => JSONBigNumber.parse(string)
    ).then(data => {
      this.props.unitsFetchSuccess(data);
      this.props.unitsSetSettings(data);
    });

    this.props.buildingsFetchBegin()
    fetch(
      `${process.env.PUBLIC_URL}/data/buildings.json`
    ).then(response => response.json()
    ).then(json => JSON.stringify(json)
    ).then(string => JSONBigNumber.parse(string)
    ).then(data => {
      this.props.buildingsFetchSuccess(data);
      this.props.buildingsSetSettings(data);
    });

    this.props.attributesFetchBegin()
    fetch(
      `${process.env.PUBLIC_URL}/data/attributes.json`
    ).then(response => response.json()
    ).then(json => JSON.stringify(json)
    ).then(string => JSONBigNumber.parse(string)
    ).then(data => {
      this.props.attributesFetchSuccess(data);
    });
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
          <Swipe
            className='game-view__swipe-wrapper'
            onSwipeStart={this.onSwipeStart.bind(this)}
            onSwipeMove={this.onSwipeMove.bind(this)}
            onSwipeEnd={this.onSwipeEnd.bind(this)}>
          <div>
            <ResourcesBar/>
            <Errors/>
            <div className='game-view__wrapper'>
              <MediaQuery query="(min-device-width: 961px)">
                <Units/>
                <CenterArea/>
                <Buildings/>
              </MediaQuery>
              <MediaQuery query="(max-device-width: 960px)">
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
              </MediaQuery>
            </div>
          </div>
          </Swipe>
        ) : <Loader/>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDipsatchToProps)(GameView)