const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: 0
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
        data: action.data
      }
    }
    case 'buildings/ADD_BUILDING': {
      state.data[action.building].quantity += 1;
      state.data[action.building].cost.combined = roundNum((state.data[action.building].cost.base * (Math.pow(state.data[action.building].cost.multiplier, state.data[action.building].quantity))), 2);
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