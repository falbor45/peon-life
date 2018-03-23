const initialState = {
  goldBase: 0,
  goldMulti: 1,
  goldIncr: 0
}

const isNumber = val => (!isNaN(val) && typeof val === 'number' && isFinite(val))

const roundNum = (num, fixed) => {
  let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return Math.round(parseFloat(num.toString().match(re)[0]) * 10) / 10
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'increments/SET_GOLD_BASE': {
      return {
        ...state,
        goldBase: action.goldBase
      }
    }
    case 'increments/SET_GOLD_MULTIPLIER': {
      return {
        ...state,
        goldMulti: action.goldMulti
      }
    }
    case 'increments/CALCULATE_INCREMENTS': {
      return {
        ...state,
        goldIncr: Math.floor((state.goldBase * state.goldMulti) * 10) / 10,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
