import resources from './parts/resources'
import units from './parts/units'
import buildings from './parts/buildings'
import increments from './parts/increments'
import errors from './parts/errors'
import happiness from './parts/happiness'
import time from './parts/time'
import experience from './parts/experience'

export default (state = {}, action) => {
  return {
    resources: resources(state.resources, action),
    increments: increments(state.increments, action),
    units: units(state.units, action),
    buildings: buildings(state.buildings, action),
    errors: errors(state.errors, action),
    happiness: happiness(state.happiness, action),
    time: time(state.time, action),
    experience: experience(state.experience, action)
  }
}