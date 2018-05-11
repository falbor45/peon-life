import { BigNumber } from 'bignumber.js'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: new BigNumber(5),
  units: new BigNumber(0),
  buyQuant: new BigNumber(1)
}

let pow = (n, m) => {
  let result = new BigNumber(1);
  for (let i = 0; i < m; i++) {
    result = result.multipliedBy(n);
  }
  return result;
};

let calculatePurchaseCost = (costBase, costMultiplier, owned, toBuy) => {
  if (toBuy === 1) {
    return costBase.multipliedBy(pow(costMultiplier, owned))
  }
  return costBase.multipliedBy((pow(costMultiplier, owned).multipliedBy(pow(costMultiplier, toBuy).minus('1'))).dividedBy(costMultiplier.minus('1')))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'units/FETCH_BEGIN': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'units/FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    }
    case 'units/FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    }
    case 'units/SET_SETTINGS': {
      return {
        ...state,
        data: action.data
      }
    }
    case 'units/ADD_WORKER': {
      let buildingUnit = action.buildingUnit;
      let value = buildingUnit ? new BigNumber(1) : state.buyQuant;
      state.data[action.worker].quantity = state.data[action.worker].quantity.plus(value);
      state.data[action.worker].cost.combined = calculatePurchaseCost(state.data[action.worker].cost.base, state.data[action.worker].cost.multiplier, state.data[action.worker].quantity, state.buyQuant);
      console.log(calculatePurchaseCost(state.data[action.worker].cost.base, state.data[action.worker].cost.multiplier, state.data[action.worker].quantity, state.buyQuant))
      return {
        ...state,
        units: state.units.plus(value).isLessThanOrEqualTo(state.unitLimit) ? state.units.plus(value) : state.units
      }
    }
    case 'units/INCREASE_WORKER_EFFICIENCY': {
      state.data[action.worker].efficiency = state.data[action.worker].efficiency.plus(action.value);
      return {
        ...state
      }
    }
    case 'units/INCREASE_UNIT_LIMIT': {
      return {
        ...state,
        unitLimit: state.unitLimit.plus(action.value)
      }
    }
    case 'units/UNLOCK_UNIT': {
      state.data[action.worker].unlocked = true;
      return {
        ...state
      }
    }
    case 'units/CHANGE_BUY_QUANT': {
      let value = new BigNumber(action.value);
      Object.keys(state.data).forEach(unit => {
        state.data[unit].cost.combined = calculatePurchaseCost(state.data[unit].cost.base, state.data[unit].cost.multiplier, state.data[unit].quantity, value);
      });
      return {
        ...state,
        buyQuant: value
      }
    }
    default:
      return {
        ...state
      }
  }
}