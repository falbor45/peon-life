import { BigNumber } from 'bignumber.js'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: new BigNumber(5),
  units: new BigNumber(0),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'units/FETCH_BEGIN': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'units/FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    }
    case 'units/FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    }
    case 'units/SET_SETTINGS': {
      return {
        ...state,
        data: action.data
      }
    }
    case 'units/ADD_WORKER': {
      let value = new BigNumber(action.value);
      state.data[action.worker].quantity = state.data[action.worker].quantity.plus(value);
      state.data[action.worker].cost.combined = state.data[action.worker].cost.combined.multipliedBy(state.data[action.worker].cost.multiplier);
      return {
        ...state,
        units: state.units.plus(value).isLessThanOrEqualTo(state.unitLimit) ? state.units.plus(value) : state.units
      }
    }
    case 'units/INCREASE_WORKER_EFFICIENCY': {
      state.data[action.worker].efficiency = state.data[action.worker].efficiency.plus(action.value);
      return {
        ...state
      }
    }
    case 'units/INCREASE_UNIT_LIMIT': {
      return {
        ...state,
        unitLimit: state.unitLimit.plus(action.value)
      }
    }
    case 'units/UNLOCK_UNIT': {
      state.data[action.worker].unlocked = true;
      return {
        ...state
      }
    }
    default:
      return {
        ...state
      }
  }
}