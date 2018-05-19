import { BigNumber } from "bignumber.js";

const initialState = {
  gold: new BigNumber(100),
  trueGold: new BigNumber(100),
  totalGold: new BigNumber(100),
  pillageChance: new BigNumber(0),
  pillagesDone: new BigNumber(0),
  pillagesGold: new BigNumber(0)
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
    case 'resources/INCREASE_PILLAGE_CHANCE': {
      return {
        ...state,
        pillageChance: state.pillageChance.plus(action.value)
      }
    }
    case 'resources/PILLAGE': {
      let trueGold = state.trueGold;
      let totalGold = state.totalGold;
      let pillagesDone = state.pillagesDone;
      let pillagesGold = state.pillagesGold;
      for (let i = 0; i < action.times; i++) {
        trueGold = trueGold.plus(action.gold);
        totalGold = totalGold.plus(action.gold);
        pillagesDone = pillagesDone.plus(1);
        pillagesGold = pillagesGold.plus(action.gold);
      }
      return {
        ...state,
        gold: trueGold.decimalPlaces(0),
        trueGold: trueGold,
        totalGold: totalGold,
        pillagesDone: pillagesDone,
        pillagesGold: pillagesGold
      }
    }
    default:
      return {
        ...state
      }
  }
}