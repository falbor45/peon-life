const initialState = {
  value: 0.4,
  realValue: 0.4,
  happiness: 0.4,
  unhappiness: 0,
  productionBonus: 1,
  zeroHappiness: 0.4,
  happinessPenaltyPercent: 0.02,
  happinessBonusPercent: 0.01
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'happiness/CALCULATE_VALUE': {
      let happiness = state.happiness;
      let unhappiness = state.unhappiness;
      let realValue = happiness - unhappiness;
      let productionBonus = realValue >= 0.4 ?
        1 + ((realValue - state.zeroHappiness) / 0.01) * state.happinessBonusPercent :
        1 - ((state.zeroHappiness - realValue) / 0.01) * state.happinessPenaltyPercent;
      if (realValue > 1) {
        realValue = 1
      }
      if (realValue < 0) {
        realValue = 0
      }
      return {
        ...state,
        realValue: realValue,
        value: realValue.toFixed(2),
        happiness: happiness,
        unhappiness: unhappiness,
        productionBonus: productionBonus
      }
    }
    case 'happiness/INCREASE_UNHAPPINESS': {
      return {
        ...state,
        unhappiness: state.unhappiness + action.value
      }
    }
    case 'happiness/INCREASE_HAPPINESS': {
      return {
        ...state,
        happiness: state.happiness + action.value
      }
    }
    case 'happiness/CHANGE_HAPPINESS_PENALTY': {
      return {
        ...state,
        happinessPenaltyPercent: action.direction === 'increase' ?
          state.happinessPenaltyPercent + action.value :
          state.happinessPenaltyPercent - action.value
      }
    }
    case 'happiness/CHANGE_HAPPINESS_BONUS': {
      return {
        ...state,
        happinessBonusPercent: action.direction === 'increase' ?
          state.happinessBonusPercent + action.value :
          state.happinessBonusPercent - action.value
      }
    }
    default:
      return {
        ...state
      }
  }
}