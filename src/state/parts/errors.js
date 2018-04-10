const initialState = {
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'errors/SET_ERROR': {
      return {
        ...state,
        error: action.error
      }
    }
    default:
      return {
        ...state
      }
  }
}