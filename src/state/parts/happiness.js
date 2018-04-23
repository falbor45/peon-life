import { BigNumber } from "bignumber.js";

const initialState = {
  value: new BigNumber(0.4),
  realValue: new BigNumber(0.4),
  happiness: new BigNumber(0.4),
  unhappiness: new BigNumber(0),
  productionBonus: new BigNumber(1),
  zeroHappiness: new BigNumber(0.4),
  happinessPenaltyPercent: new BigNumber(0.02),
  happinessBonusPercent: new BigNumber(0.01)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'happiness/CALCULATE_VALUE': {
      let happiness = state.happiness;
      let unhappiness = state.unhappiness;
      let realValue = happiness.minus(unhappiness);
      let productionBonus = realValue.isGreaterThanOrEqualTo(0.4) ?
        new BigNumber(1).plus((realValue.minus(state.zeroHappiness).dividedBy(0.01)).multipliedBy(state.happinessBonusPercent)) :
        new BigNumber(1).minus((state.zeroHappiness.minus(realValue).dividedBy(0.01)).multipliedBy(state.happinessPenaltyPercent));
      if (realValue.isGreaterThan(1)) {
        realValue = new BigNumber(1)
      }
      if (realValue.isLessThan(0)) {
        realValue = new BigNumber(0)
      }
      return {
        ...state,
        realValue: realValue,
        value: realValue.decimalPlaces(2),
        happiness: happiness,
        unhappiness: unhappiness,
        productionBonus: productionBonus
      }
    }
    case 'happiness/INCREASE_UNHAPPINESS': {
      return {
        ...state,
        unhappiness: state.unhappiness.plus(action.value)
      }
    }
    case 'happiness/INCREASE_HAPPINESS': {
      return {
        ...state,
        happiness: state.happiness.plus(action.value)
      }
    }
    case 'happiness/CHANGE_HAPPINESS_PENALTY': {
      return {
        ...state,
        happinessPenaltyPercent: action.direction === 'increase' ?
          state.happinessPenaltyPercent.plus(action.value):
          state.happinessPenaltyPercent.minus(action.value)
      }
    }
    case 'happiness/CHANGE_HAPPINESS_BONUS': {
      return {
        ...state,
        happinessBonusPercent: action.direction === 'increase' ?
          state.happinessBonusPercent.plus(action.value):
          state.happinessBonusPercent.minus(action.value)
      }
    }
    default:
      return {
        ...state
      }
  }
}