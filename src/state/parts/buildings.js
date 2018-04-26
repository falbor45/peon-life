import { BigNumber } from 'bignumber.js'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: new BigNumber(0)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'buildings/FETCH_BEGIN': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'buildings/FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    }
    case 'buildings/FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    }
    case 'buildings/SET_SETTINGS': {
      return {
        ...state,
        data: action.data
      }
    }
    case 'buildings/ADD_BUILDING': {
      let value = new BigNumber(action.value);
      state.data[action.building].quantity = state.data[action.building].quantity.plus(value);
      state.data[action.building].cost.combined = state.data[action.building].cost.combined.multipliedBy(state.data[action.building].cost.multiplier);
      return {
        ...state,
        buildingsQuant: state.buildingsQuant.plus(value)
      }
    }
    default:
      return {
        ...state
      }
  }
}