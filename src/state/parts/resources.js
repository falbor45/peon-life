import { BigNumber } from "bignumber.js";

const initialState = {
  gold: new BigNumber(100),
  trueGold: new BigNumber(100),
  totalGold: new BigNumber(100)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'resources/INCREMENT': {
      let trueGold = state.trueGold.plus(action.gold);
      let totalGold = state.totalGold.plus(action.gold);
      return {
        ...state,
        gold: trueGold.decimalPlaces(0),
        trueGold: trueGold,
        totalGold: totalGold
      }
    }
    case 'resources/DECREMENT': {
      let trueGold = state.trueGold.minus(action.gold);
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