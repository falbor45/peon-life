import resources from '../resources'

const initialState = {
  gold: 0
};

describe('resources', () => {
  it('should return a function', () => {
    expect(typeof resources).toBe('function')
  });
  it('should return initial state', () => {
    const action = {
      type: 'abc'
    };
    expect(resources(undefined, action)).toEqual(initialState)
  });
  it('should properly increment values of resources', () => {
    const action = {
      type: 'INCREMENT',
      gold: 1,
    };

    const expectedState = {
      ...initialState,
      gold: 1,
    };
    expect(resources(initialState, action)).toEqual(expectedState)
  });
  it('should properly decrement values of resources', () => {
    const action = {
      type: 'DECREMENT',
      gold: 1,
    };

    const expectedState = {
      ...initialState,
      gold: -1,
    };
    expect(resources(initialState, action)).toEqual(expectedState)
  });
})