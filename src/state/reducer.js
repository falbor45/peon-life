import resources from './parts/resources'
export default (state = {}, action) => {
  return {
    resources: resources(state.resources, action)
  }
}