const initialState = {
  gold: 0
}

const isNumber = val => (!isNaN(val) && typeof val === 'number' && isFinite(val))

const roundNum = (num, fixed) => {
  let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return Math.round(parseFloat(num.toString().match(re)[0]) * 10) / 10
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        gold: isNumber(action.gold) ? roundNum(state.gold + action.gold, 2) : state.gold,

      }
    }
    case 'DECREMENT': {
      return {
        gold: isNumber(action.gold) ? roundNum(state.gold - action.gold, 2) : state.gold,
      }
    }
    default:
      return {
        ...state
      }
  }
}