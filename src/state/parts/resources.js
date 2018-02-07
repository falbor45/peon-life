const initialState = {
  gold: 0,
  coal: 0,
  iron: 0,
  stone: 0,
  wood: 0,
  food: 0
}

const isNumber = val => (!isNaN(val) && typeof val === 'number' && isFinite(val))

const roundNum = (num, fixed) => {
  let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return Math.round(parseFloat(num.toString().match(re)[0]) * 10) / 10
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        gold: isNumber(action.gold) ? roundNum(state.gold + action.gold, 2) : state.gold,
        coal: isNumber(action.coal) ? roundNum(state.coal + action.coal, 2) : state.coal,
        iron: isNumber(action.iron) ? roundNum(state.iron + action.iron, 2) : state.iron,
        stone: isNumber(action.stone) ? roundNum(state.stone + action.stone, 2) : state.stone,
        wood: isNumber(action.wood) ? roundNum(state.wood + action.wood, 2) : state.wood,
        food: isNumber(action.food) ? roundNum(state.food + action.food, 2) : state.food
      }
    }
    case 'DECREMENT': {
      return {
        gold: isNumber(action.gold) ? roundNum(state.gold - action.gold, 2) : state.gold,
        coal: isNumber(action.coal) ? roundNum(state.coal - action.coal, 2) : state.coal,
        iron: isNumber(action.iron) ? roundNum(state.iron - action.iron, 2) : state.iron,
        stone: isNumber(action.stone) ? roundNum(state.stone - action.stone, 2) : state.stone,
        wood: isNumber(action.wood) ? roundNum(state.wood - action.wood, 2) : state.wood,
        food: isNumber(action.food) ? roundNum(state.food - action.food, 2) : state.food
      }
    }
    default:
      return {
        ...state
      }
  }
}