import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import Info from './assets/info-icon.png'
import Coin from './assets/gold-coin.png'
import pluralize from 'pluralize'
import './Entity.css'

export default class Entity extends Component {
  render() {
    return (
        <div className="entity-wrapper">
          <div className={`entity ${this.props.enabled === true ? 'enabled' : 'disabled'}`}
               onClick={() => this.props.clickEvent(this.props.entity)}>
            <img src="https://lorempizza.com/64/64" alt="entity icon"/>
            <div className="entity__info">
              <p className="entity__name">{this.props.name}</p>
              <p className="entity__cost">
                <img src={Coin} className="entity-cost__image" alt="coin"/>
                {this.props.cost}
              </p>
            </div>
            <p className="entity__quantity">{this.props.quantity}</p>
            <div className={`${this.props.enabled === true ? null : 'entity__overlay--disabled'}`}> </div>
          </div>
          <div data-tip data-for={`${this.props.name}-tooltip`}
               className="entity__info-icon">
            <img src={Info} alt="info"/>
            <ReactTooltip effect="solid" id={`${this.props.name}-tooltip`}>
              <div className="entity-tooltip">
                <div className="entity-tooltip__icon">
                  <img src='https://lorempizza.com/64/64' alt="entity icon"/>
                </div>
                <div className="entity-tooltip__info">
                  <p className="entity-tooltip__name">{this.props.name}</p>
                  <p className="entity-tooltip__owned">(Owned: {this.props.quantity})</p>
                </div>
                <div className="entity-tooltip__cost">
                  <p>
                    <img src={Coin} className="entity-cost__image" alt="coin"/>
                    {this.props.cost}
                  </p>
                </div>
              </div>
              {
                this.props.unit ? (
                  <ul className="entity-tooltip__data">
                    <li>Each {this.props.name.toLowerCase()} produces {this.props.unitYieldS} gold per second</li>
                    <li>You currently own {this.props.quantity} {this.props.quantity === '1' ? this.props.name.toLowerCase() : pluralize(this.props.name.toLowerCase())}.</li>
                    <li>Your {this.props.quantity === '1' ? this.props.name.toLowerCase() : pluralize(this.props.name.toLowerCase())} are producing {this.props.unitYieldM} gold per second.</li>
                  </ul>
                ) : (
                  <ul className="entity-tooltip__data">
                    {this.props.entity.description.map(e =>
                      <li>{e}</li>
                    )}
                    <li>You currently own {this.props.quantity} {this.props.quantity === '1' ? this.props.name.toLowerCase() : pluralize(this.props.name.toLowerCase())}.</li>
                  </ul>
                )
              }
            </ReactTooltip>
          </div>
        </div>
    )
  }
}