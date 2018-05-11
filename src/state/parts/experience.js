import { BigNumber } from 'bignumber.js'

const initialState = {
  level: new BigNumber(1),
  experience: new BigNumber(0),
  nextLevelExpMulti: new BigNumber(1.15),
  nextLevelExp: new BigNumber(100),
  attributePoints: {
    unspent: new BigNumber(0),
    spent: new BigNumber(0)
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'experience/INCREASE_EXPERIENCE': {
      let value = new BigNumber(action.value);
      let newExperience = state.experience.plus(value);
      let didLevelUp = newExperience.isGreaterThanOrEqualTo(state.nextLevelExp);
      return {
        ...state,
        level: didLevelUp ? state.level.plus(1) : state.level,
        experience: didLevelUp ? newExperience.minus(state.nextLevelExp) : newExperience,
        nextLevelExp: didLevelUp ? state.nextLevelExp.multipliedBy(state.nextLevelExpMulti).decimalPlaces(0) : state.nextLevelExp,
        attributePoints: {
          unspent: didLevelUp ? state.attributePoints.unspent.plus(1) : state.attributePoints.unspent,
          spent: state.attributePoints.spent
        }
      }
    }
    case 'experience/SPEND_ATTRIBUTE_POINT': {
      let value = action.value;
      return {
        ...state,
        attributePoints: {
          unspent: state.attributePoints.unspent.minus(value).isLessThan(0) ? state.attributePoints.unspent : state.attributePoints.unspent.minus(value),
          spent: state.attributePoints.unspent.plus(value)
        }
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}