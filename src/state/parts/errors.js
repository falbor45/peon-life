// Having 'error' prop in initialState set to null
// does not allow for first mutation in Errors component
// to trigger at all, nor does empty string.

const initialState = {
  error: 'foo'
};

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