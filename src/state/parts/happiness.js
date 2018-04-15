const initialState = {
  value: 0.4,
  realValue: 0.4,
  happiness: 0.4,
  unhappiness: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'happiness/CALCULATE_VALUE': {
      let happiness = state.happiness;
      let unhappiness = state.unhappiness;
      let realValue = happiness - unhappiness;
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
        unhappiness: unhappiness
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
    default:
      return {
        ...state
      }
  }
}