const initialState = {
  gold: 0,
  coal: 0,
  iron: 0,
  stone: 0,
  wood: 0,
  food: 0
}

const isNumber = val => (!isNaN(val) && typeof val === 'number' && isFinite(val))


export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        gold: isNumber(action.gold) ? state.gold + action.gold : state.gold,
        coal: isNumber(action.coal) ? state.coal + action.coal : state.coal,
        iron: isNumber(action.iron) ? state.iron + action.iron : state.iron,
        stone: isNumber(action.stone) ? state.stone + action.stone : state.stone,
        wood: isNumber(action.wood) ? state.wood + action.wood : state.wood,
        food: isNumber(action.food) ? state.food + action.food : state.food
      }
    }
    case 'DECREMENT': {
      return {
        gold: isNumber(action.gold) ? state.gold - action.gold : state.gold,
        coal: isNumber(action.coal) ? state.coal - action.coal : state.coal,
        iron: isNumber(action.iron) ? state.iron - action.iron : state.iron,
        stone: isNumber(action.stone) ? state.stone - action.stone : state.stone,
        wood: isNumber(action.wood) ? state.wood - action.wood : state.wood,
        food: isNumber(action.food) ? state.food - action.food : state.food
      }
    }
    default:
      return {
        ...state
      }
  }
}