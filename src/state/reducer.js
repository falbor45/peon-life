import resources from './parts/resources'
import units from './parts/units'
import buildings from './parts/buildings'
import increments from './parts/increments'
import errors from './parts/errors'

export default (state = {}, action) => {
  return {
    resources: resources(state.resources, action),
    increments: increments(state.increments, action),
    units: units(state.units, action),
    buildings: buildings(state.buildings, action),
    errors: errors(state.errors, action)
  }
}