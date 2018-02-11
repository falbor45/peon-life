const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: 0,
  buildings: {
    cottages: 0,
    mines: 0,
    quarries: 0,
    sawmills: 0,
    windmills: 0,
  }
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
    case 'ADD_BUILDING': {
      state.buildings[action.building] += 1;
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