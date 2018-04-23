import { BigNumber } from "bignumber.js";

const initialState = {
  gold: new BigNumber(100),
  trueGold: new BigNumber(100),
  totalGold: new BigNumber(100)
}

const isNumber = val => (!isNaN(val) && typeof val === 'number' && isFinite(val))


export default (state = initialState, action) => {
  switch (action.type) {
    case 'resources/INCREMENT': {
      let trueGold =  isNumber(action.gold) ? state.trueGold.plus(action.gold) : state.trueGold;
      let totalGold = isNumber(action.gold) ? state.totalGold.plus(action.gold) : state.totalGold;
      return {
        ...state,
        gold: trueGold.decimalPlaces(0),
        trueGold: trueGold,
        totalGold: totalGold
      }
    }
    case 'resources/DECREMENT': {
      let trueGold = isNumber(action.gold) ? state.trueGold.minus(action.gold) : state.trueGold
      return {
        ...state,
        gold: trueGold,
        trueGold: trueGold
      }
    }
    default:
      return {
        ...state
      }
  }
}