import React, {Component} from 'react'
import Swipe from 'react-easy-swipe'
import ResourcesBar from './ResourcesView'
export default class GameView extends Component {

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