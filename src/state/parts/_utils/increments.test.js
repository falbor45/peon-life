import increments from '../increments'

const initialState = {
  goldBase: 0,
  goldMulti: 1,
  goldIncr: 0
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
  it('should properly set values of goldBase', () =>  {
    const action = {
      type: 'increments/SET_GOLD_BASE',
      goldBase: 1
    };

    const expectedState = {
      ...initialState,
      goldBase: 1
    };
    expect(increments(initialState, action)).toEqual(expectedState);
  });
  it('should properly set gold multiplier', () => {
    const action = {
      type: 'increments/SET_GOLD_MULTIPLIER',
      goldMulti: 0.2
    };

    const expectedState = {
      ...initialState,
      goldMulti: 0.2
    };
    expect(increments(initialState, action)).toEqual(expectedState);
  });
  it('should properly calculate increments', () => {
    const action = {
      type: 'increments/CALCULATE_INCREMENTS'
    };

    const testState = {
      ...initialState,
      goldBase: 10,
      goldMulti: 1,
      goldIncr: 0
    };

    const expectedState = {
      ...initialState,
      goldBase: 10,
      goldMulti: 1,
      goldIncr: 10
    };

    expect(increments(testState, action)).toEqual(expectedState);
  });
});