const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: 5,
  units: 0,
  miners: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  quarriers: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  lumberjacks: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  farmers: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  }
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
      state[action.worker].quantity += 1;
      state[action.worker].cost.combined = roundNum(state[action.worker].cost.base * state[action.worker].cost.multiplier, 2);
      state[action.worker].cost.multiplier = Math.pow(state[action.worker].cost.multiplier, state[action.worker].quantity + 1);
      return {
        ...state,
        units: state.units !== state.unitLimit ? state.units + 1 : state.units
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