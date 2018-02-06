import increments from '../increments'

const initialState = {
  goldBase: 0,
  goldMulti: 1,
  goldIncr: 0,
  coalBase: 0,
  coalMulti: 1,
  coalIncr: 0,
  ironBase: 0,
  ironMulti: 1,
  ironIncr: 0,
  stoneBase: 0,
  stoneMulti: 1,
  stoneIncr: 0,
  woodBase: 0,
  woodMulti: 1,
  woodIncr: 0,
  foodBase: 0,
  foodMulti: 1,
  foodIncr: 0
}

describe('increments', () => {
  it('should return a function', () => {
    expect(typeof increments).toBe('function')
  });
  it('should return initial state', () => {
    const action = {
      type: 'abc'
    };
    expect(increments(undefined, action)).toEqual(initialState);
  });
  it('should properly increment values of base increments', () =>  {
    const action = {
      type: 'INCREMENT',
      goldBase: 1,
      coalBase: 0.2,
      ironBase: 0.8,
      stoneBase: NaN,
      woodBase: undefined,
      foodBase: null
    };

    const expectedState = {
      ...initialState,
      goldBase: initialState.goldBase + 1,
      coalBase: initialState.coalBase + 0.2,
      ironBase: initialState.ironBase + 0.8,
    };
    expect(increments(initialState, action)).toEqual(expectedState);
  });
  it('should properly decrement values of base increments', () => {
    const action = {
      type: 'DECREMENT',
      goldBase: 1,
      coalBase: 0.2,
      ironBase: 0.8,
      stoneBase: NaN,
      woodBase: undefined,
      foodBase: null
    };

    const expectedState = {
      ...initialState,
      goldBase: initialState.goldBase - 1,
      coalBase: initialState.coalBase - 0.2,
      ironBase: initialState.ironBase - 0.8
    };
    expect(increments(initialState, action)).toEqual(expectedState);
  });
  it('should properly increase multiplier', () => {
    const action = {
      type: 'INCREASE_MULTIPLIER',
      goldMulti: 1,
      coalMulti: 0.2,
      ironMulti: 0.8,
      stoneMulti: NaN,
      woodMulti: undefined,
      foodMulti: null
    };

    const expectedState = {
      ...initialState,
      goldMulti: initialState.goldMulti + 1,
      coalMulti: initialState.coalMulti + 0.2,
      ironMulti: initialState.ironMulti + 0.8
    };
    expect(increments(initialState, action)).toEqual(expectedState);
  });
  it('should properly decrease multiplier', () => {
    const action = {
      type: 'DECREASE_MULTIPLIER',
      goldMulti: 1,
      coalMulti: 0.2,
      ironMulti: 0.8,
      stoneMulti: NaN,
      woodMulti: undefined,
      foodMulti: null
    };

    const expectedState = {
      ...initialState,
      goldMulti: initialState.goldMulti + 1,
      coalMulti: initialState.coalMulti + 0.2,
      ironMulti: initialState.ironMulti + 0.8
    };
    expect(increments(initialState, action)).toEqual(expectedState)
  });
  it('should properly calculate increments', () => {
    const action = {
      type: 'CALCULATE_INCREMENTS'
    };

    const testState = {
      goldBase: 10,
      goldMulti: 1,
      goldIncr: 0,
      coalBase: 12,
      coalMulti: 1.02,
      coalIncr: 0,
      ironBase: 25,
      ironMulti: 1.4,
      ironIncr: 0,
      stoneBase: 0.3,
      stoneMulti: 0.98,
      stoneIncr: 0,
      woodBase: 4,
      woodMulti: 0.01,
      woodIncr: 0,
      foodBase: 0,
      foodMulti: 0.2,
      foodIncr: 0
    };

    const expectedState = {
      ...testState,
      goldIncr: 10,
      coalIncr: 12.2,
      ironIncr: 35,
      stoneIncr: 0.2,
      woodIncr: 0,
      foodIncr: 0,
    };

    expect(increments(testState, action)).toEqual(expectedState);
  });
});