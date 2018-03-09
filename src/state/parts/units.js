const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: 5,
  units: 0,
}

const roundNum = (num, fixed) => {
  let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return Math.round(parseFloat(num.toString().match(re)[0]) * 10) / 10
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
        unitLimit: action.data.unitLimit,
        units: action.data.units,
        miners: action.data.miners,
        quarriers: action.data.quarriers,
        lumberjacks: action.data.lumberjacks,
        farmers: action.data.farmers
      }
    }
    case 'units/ADD_WORKER': {
      state.data[action.worker].quantity += action.value;
      state.data[action.worker].cost.combined = roundNum((state.data[action.worker].cost.base * (Math.pow(state.data[action.worker].cost.multiplier, state.data[action.worker].quantity))), 2);
      return {
        ...state,
        units: state.units !== state.unitLimit ? state.units + action.value : state.units
      }
    }
    case 'units/INCREASE_WORKER_EFFICIENCY': {
      state[action.worker].efficiency = roundNum((state[action.worker].efficiency + action.value), 2);
      return {
        ...state,
      }
    }
    case 'units/INCREASE_UNIT_LIMIT': {
      return {
        ...state,
        unitLimit: state.unitLimit + action.value
      }
    }
    default:
      return {
        ...state
      }
  }
}