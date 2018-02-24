import resources from './parts/resources'
import units from './parts/units'
import buildings from './parts/buildings'

export default (state = {}, action) => {
  return {
    resources: resources(state.resources, action),
    units: units(state.units, action),
    buildings: buildings(state.buildings, action)
  }
}