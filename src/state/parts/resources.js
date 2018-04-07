const initialState = {
  gold: 0,
  trueGold: 0
}

const isNumber = val => (!isNaN(val) && typeof val === 'number' && isFinite(val))


export default (state = initialState, action) => {
  switch (action.type) {
    case 'resources/INCREMENT': {
      let trueGold =  isNumber(action.gold) ? state.trueGold + action.gold : state.trueGold
      return {
        gold: Math.floor(trueGold),
        trueGold: trueGold
      }
    }
    case 'resources/DECREMENT': {
      let trueGold =  isNumber(action.gold) ? state.trueGold - action.gold : state.trueGold
      return {
        gold: Math.floor(trueGold),
        trueGold: trueGold
      }
    }
    default:
      return {
        ...state
      }
  }
}