import React, { Component } from 'react'
import {connect} from 'react-redux'
import {BigNumber} from 'bignumber.js'
import './Stats.css'
import ProgressBar from './ProgressBar'
import Listing from './Listing'

const mapStateToProps = state => {
  return {
    units: state.units,
    buildings: state.buildings,
    resources: state.resources,
    increments: state.increments,
    experience: state.experience
  }
}

class Stats extends Component {
  render() {
    return (
      <div className="stats">
        <div className="stats-heading">
          <span className="stats-heading__border"> </span>
          <p className="stats-heading__title">Statistics</p>
          <span className="stats-heading__border"> </span>
        </div>
        <div className="stats-experience__wrapper">
          <ProgressBar fill={`${(this.props.experience.experience.dividedBy(this.props.experience.nextLevelExp)).multipliedBy(100)}%`}
                       text={`Experience: ${this.props.experience.experience} / ${this.props.experience.nextLevelExp}`}/>
        </div>
        <Listing textLeft="Gold in bank: " textRight={this.props.resources.gold.decimalPlaces(0).toString()} goldIcon={true}/>
        <Listing textLeft="Gold acquired: " textRight={this.props.resources.totalGold.decimalPlaces(0).toString()} goldIcon={true}/>
        <Listing textLeft="Gold per second: " textRight={this.props.increments.goldIncr.toString()} goldIcon={true}/>
        <Listing textLeft="Owned units: " textRight={this.props.units.units.toString()}/>
        <Listing textLeft="Owned buildings: " textRight={this.props.buildings.buildingsQuant.toString()}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Stats)