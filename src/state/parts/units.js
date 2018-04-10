const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: 5,
  units: 0,
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
      state.data[action.worker].quantity += action.value;
      state.data[action.worker].cost.combined = Math.floor(state.data[action.worker].cost.base * (Math.pow(state.data[action.worker].cost.multiplier, state.data[action.worker].quantity)));
      return {
        ...state,
        units: state.units + action.value <= state.unitLimit ? state.units + action.value : state.units
      }
    }
    case 'units/INCREASE_WORKER_EFFICIENCY': {
      state.data[action.worker].efficiency = state.data[action.worker].efficiency + action.value;
      return {
        ...state
      }
    }
    case 'units/INCREASE_UNIT_LIMIT': {
      return {
        ...state,
        unitLimit: state.unitLimit + action.value
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