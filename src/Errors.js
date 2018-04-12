import React, { Component } from 'react'
import {connect} from 'react-redux'
import './Errors.css'


let mapStateToProps = state => {
  return {
    errors: state.errors
  }
};

class Errors extends Component {

  componentDidMount() {
    let container = document.getElementsByClassName('errors')[0];
    let targetNode = document.querySelector('.errors span');
    let config = {attributes: false, childList: false, subtree: true, characterData: true};
    let callback = () => {
      container.style.opacity = '1';
    };
    let observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
  }

  render() {
    return (
      <div className='errors'>
        <div className='errors-touch'
             onClick={() => document.getElementsByClassName('errors')[0].style.opacity = '0'}> </div>
        <span>{this.props.errors.error}</span>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Errors)