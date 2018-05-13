const initialState = {
  fetching: null,
  error: null,
  data: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'attributes/FETCH_BEGIN': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'attributes/FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    }
    case 'attributes/FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    }
    case 'attributes/INCREASE_ATTRIBUTE': {
      state.data[action.attribute].level = state.data[action.attribute].level.plus(1);
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}