const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: 0,
  cottages: {
    quantity: 0,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  mines: {
    quantity: 0,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  quarries: {
    quantity: 0,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  sawmills: {
    quantity: 0,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  windmills: {
    quantity: 0,
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
        buildingsQuant: action.data.buildingsQuant,
        cottages: action.data.cottages,
        mines: action.data.mines,
        quarries: action.data.quarries,
        sawmills: action.data.sawmills,
        windmills: action.data.windmills
      }
    }
    case 'buildings/ADD_BUILDING': {
      state[action.building].quantity += 1;
      state[action.building].cost.combined = roundNum(state[action.building].cost.base * state[action.building].cost.multiplier, 2);
      state[action.building].cost.multiplier = Math.pow(state[action.building].cost.multiplier, state[action.building].quantity + 1);
      return {
        ...state,
        buildingsQuant: state.buildingsQuant + 1
      }
    }
    default:
      return {
        ...state
      }
  }
}