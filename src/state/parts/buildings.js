import { BigNumber } from 'bignumber.js'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: new BigNumber(0),
  buyQuant: new BigNumber(1)
};

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
    case 'buildings/FETCH_BEGIN': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'buildings/FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    }
    case 'buildings/FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    }
    case 'buildings/SET_SETTINGS': {
      return {
        ...state,
        data: action.data
      }
    }
    case 'buildings/ADD_BUILDING': {
      state.data[action.building].quantity = state.data[action.building].quantity.plus(state.buyQuant);
      state.data[action.building].cost.combined = calculatePurchaseCost(state.data[action.building].cost.base, state.data[action.building].cost.multiplier, state.data[action.building].quantity, state.buyQuant)
      return {
        ...state,
        buildingsQuant: state.buildingsQuant.plus(state.buyQuant)
      }
    }
    case 'buildings/CHANGE_BUY_QUANT': {
      let value = new BigNumber(action.value);
      Object.keys(state.data).forEach(building => {
        state.data[building].cost.combined = calculatePurchaseCost(state.data[building].cost.base, state.data[building].cost.multiplier, state.data[building].quantity, value);
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