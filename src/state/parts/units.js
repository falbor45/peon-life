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
    case 'FETCH_BEGIN': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    }
    case 'FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    }
    case 'ADD_WORKER': {
      state[action.worker].quantity += 1;
      return {
        ...state,
        units: state.units !== state.unitLimit ? state.units + 1 : state.units
      }
    }
    case 'INCREASE_WORKER_EFFICIENCY': {
      state[action.worker].efficiency = roundNum((state[action.worker].efficiency + action.value), 2);
      return {
        ...state,
      }
    }
    case 'INCREASE_UNIT_LIMIT': {
      return {
        ...state,
        unitLimit: state.unitLimit + action.value
      }
    }
    default:
      return {
        ...initialState
      }
  }
}