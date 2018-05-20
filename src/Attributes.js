import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Attributes.css'
import Listing from './Listing'

const mapStateToProps = state => {
  return {
    experience: state.experience,
    attributes: state.attributes
  }
};

const mapDispatchToProps = dispatch => {
  return {
    spendAttributePoint: attribute => {
      dispatch({type: 'experience/SPEND_ATTRIBUTE_POINT', value: 1});
      for (let i = 0; i < attribute.effects.length; i++) {
        dispatch(attribute.effects[i]);
      }
    }
  }
}

class Policies extends Component {
  canSpendAttributePoint = () => this.props.experience.attributePoints.unspent.isGreaterThan(0);

  objToArr = object => {
    let result = [];
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        result.push(object[prop]);
      }
    }

    return result
  };

  spendAttributePoint = attribute => {
    if (this.props.experience.attributePoints.unspent.minus(1).isGreaterThanOrEqualTo(0)) {
      this.props.spendAttributePoint(attribute);
    }
    return null;
  };


  mapAttribute = attribute => {
    return (
      <div className="attributes-item">
        <div className="attributes-item-info">
          <img src={attribute.icon} alt="icon"/>
          <div className="attributes-item__desc">
            <div>
              <p>{attribute.name}</p>
              <p>Lvl. {attribute.level.toString()}</p>
            </div>
              <button className={`attributes-item__button attributes-item__button--${this.canSpendAttributePoint() ? 'enabled' : 'disabled'}`}
                      onClick={() => this.spendAttributePoint(attribute)}>Level up</button>
          </div>
        </div>
        <p className="xx">
          {attribute.description}
        </p>
      </div>
    )
  };

  mapAttributes = () => {
    return this.objToArr(this.props.attributes.data).map(e => this.mapAttribute(e));
  }

  render() {
    return (
      <div>
        <div className="attributes-heading">
          <span className="attributes-heading__border"> </span>
          <p className="attributes-heading__title">Attributes</p>
          <span className="attributes-heading__border"> </span>
        </div>
        <div className="attributes-wrapper">
          {this.mapAttributes()}
        </div>
        <Listing textLeft="Attribute points left: " textRight={this.props.experience.attributePoints.unspent.toString()}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Policies)