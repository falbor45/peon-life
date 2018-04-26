import { BigNumber } from 'bignumber.js'

const initialState = {
  goldBase: new BigNumber(1),
  goldMulti: new BigNumber(1),
  goldIncr: new BigNumber(1),
  ticksPerSec: new BigNumber(1)
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'increments/SET_GOLD_BASE': {
      return {
        ...state,
        goldBase: new BigNumber(1).plus(action.goldBase)
      }
    }
    case 'increments/SET_GOLD_MULTIPLIER': {
      return {
        ...state,
        goldMulti: new BigNumber(action.goldMulti)
      }
    }
    case 'increments/CALCULATE_INCREMENTS': {
      return {
        ...state,
        goldIncr: state.goldBase.multipliedBy(state.goldMulti).multipliedBy(action.productionBonus).decimalPlaces(2)
      }
    }
    case 'increments/INCREASE_TICKS': {
      return {
        ...state,
        ticksPerSec: state.ticksPerSec.plus(action.value)
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
