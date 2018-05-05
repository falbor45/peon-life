import { BigNumber } from 'bignumber.js'

const initialState = {
  hourDuration: new BigNumber(1000),
  date: {
    year: new BigNumber(1),
    month: new BigNumber(1),
    day: new BigNumber(1),
    hour: new BigNumber(12)
  }
};

let moveDate = date => {
  date.hour = date.hour.plus(1);
  if (date.hour > 24) {
    date.day = date.day.plus(1);
    date.hour = new BigNumber(1);
    // date.day += 1
    // move hour = 1
    if (date.day > 30) {
      date.month = date.month.plus(1);
      date.day = new BigNumber(1);
      // date.month += 1
      // move day = 1
      if (date.month > 10) {
        date.year = date.year.plus(1);
        date.month = new BigNumber(1);
        // date.year += 1
        // move month = 1
      }
    }
  }
  return date;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'time/TIME_TICK': {
      return {
        ...state,
        date: moveDate(state.date)
      }
    }
    case 'time/DECREASE_HOUR_DURATION': {
      return {
        ...state,
        hourDuration: state.hourDuration.minus(action.value)
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}