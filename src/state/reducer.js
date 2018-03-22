import resources from './parts/resources'
import units from './parts/units'
import buildings from './parts/buildings'
import increments from './parts/increments'

export default (state = {}, action) => {
  return {
    resources: resources(state.resources, action),
    increments: increments(state.increments, action),
    units: units(state.units, action),
    buildings: buildings(state.buildings, action)
  }
}