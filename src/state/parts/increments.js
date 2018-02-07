const initialState = {
  goldBase: 0,
  goldMulti: 1,
  goldIncr: 0,
  coalBase: 0,
  coalMulti: 1,
  coalIncr: 0,
  ironBase: 0,
  ironMulti: 1,
  ironIncr: 0,
  stoneBase: 0,
  stoneMulti: 1,
  stoneIncr: 0,
  woodBase: 0,
  woodMulti: 1,
  woodIncr: 0,
  foodBase: 0,
  foodMulti: 1,
  foodIncr: 0
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
        ...state,
        goldBase: isNumber(action.goldBase) ? roundNum(state.goldBase + action.goldBase, 2) : state.goldBase,
        coalBase: isNumber(action.coalBase) ? roundNum(state.coalBase + action.coalBase, 2) : state.coalBase,
        ironBase: isNumber(action.ironBase) ? roundNum(state.ironBase + action.ironBase, 2) : state.ironBase,
        stoneBase: isNumber(action.stoneBase) ? roundNum(state.stoneBase + action.stoneBase, 2) : state.stoneBase,
        woodBase: isNumber(action.woodBase) ? roundNum(state.woodBase + action.woodBase, 2) : state.woodBase,
        foodBase: isNumber(action.foodBase) ? roundNum(state.foodBase + action.foodBase, 2) : state.foodBase
      }
    }
    case 'DECREMENT': {
      return {
        ...state,
        goldBase: isNumber(action.goldBase) ? roundNum(state.goldBase - action.goldBase, 2) : state.goldBase,
        coalBase: isNumber(action.coalBase) ? roundNum(state.coalBase - action.coalBase, 2) : state.coalBase,
        ironBase: isNumber(action.ironBase) ? roundNum(state.ironBase - action.ironBase, 2) : state.ironBase,
        stoneBase: isNumber(action.stoneBase) ? roundNum(state.stoneBase - action.stoneBase, 2) : state.stoneBase,
        woodBase: isNumber(action.woodBase) ? roundNum(state.woodBase - action.woodBase, 2) : state.woodBase,
        foodBase: isNumber(action.foodBase) ? roundNum(state.foodBase - action.foodBase, 2) : state.foodBase
      }
    }
    case 'INCREASE_MULTIPLIER': {
      return {
        ...state,
        goldMulti: isNumber(action.goldMulti) ? roundNum(state.goldMulti + action.goldMulti, 2) : state.goldMulti,
        coalMulti: isNumber(action.coalMulti) ? roundNum(state.coalMulti + action.coalMulti, 2) : state.coalMulti,
        ironMulti: isNumber(action.ironMulti) ? roundNum(state.ironMulti + action.ironMulti, 2) : state.ironMulti,
        stoneMulti: isNumber(action.stoneMulti) ? roundNum(state.stoneMulti + action.stoneMulti, 2) : state.stoneMulti,
        woodMulti: isNumber(action.woodMulti) ? roundNum(state.woodMulti + action.woodMulti, 2) : state.woodMulti,
        foodMulti: isNumber(action.foodMulti) ? roundNum(state.foodMulti + action.foodMulti, 2) : state.foodMulti
      }
    }
    case 'DECREASE_MULTIPLIER': {
      return {
        ...state,
        goldMulti: isNumber(action.goldMulti) ? roundNum(state.goldMulti - action.goldMulti, 2) : state.goldMulti,
        coalMulti: isNumber(action.coalMulti) ? roundNum(state.coalMulti - action.coalMulti, 2) : state.coalMulti,
        ironMulti: isNumber(action.ironMulti) ? roundNum(state.ironMulti - action.ironMulti, 2) : state.ironMulti,
        stoneMulti: isNumber(action.stoneMulti) ? roundNum(state.stoneMulti - action.stoneMulti, 2) : state.stoneMulti,
        woodMulti: isNumber(action.woodMulti) ? roundNum(state.woodMulti - action.woodMulti, 2) : state.woodMulti,
        foodMulti: isNumber(action.foodMulti) ? roundNum(state.foodMulti - action.foodMulti, 2) : state.foodMulti
      }
    }
    case 'CALCULATE_INCREMENTS': {
      return {
        ...state,
        goldIncr: Math.floor((state.goldBase * state.goldMulti) * 10) / 10,
        coalIncr: Math.floor((state.coalBase * state.coalMulti) * 10) / 10,
        ironIncr: Math.floor((state.ironBase * state.ironMulti) * 10) / 10,
        stoneIncr: Math.floor((state.stoneBase * state.stoneMulti) * 10) / 10,
        woodIncr: Math.floor((state.woodBase * state.woodMulti) * 10) / 10,
        foodIncr: Math.floor((state.foodBase * state.foodMulti) * 10) / 10
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
