import resources from '../resources'

const initialState = {
  gold: 0,
  coal: 0,
  iron: 0,
  stone: 0,
  wood: 0,
  food: 0
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
      coal: 0.2,
      iron: 0.8,
      stone: NaN,
      wood: undefined,
      food: null
    };

    const testState = {
      ...initialState,
      coal: 0.1
    }

    const expectedState = {
      ...initialState,
      gold: 1,
      coal: 0.3,
      iron: 0.8,
    };
    expect(resources(testState, action)).toEqual(expectedState)
  });
  it('should properly decrement values of resources', () => {
    const action = {
      type: 'DECREMENT',
      gold: 1,
      coal: 0.2,
      iron: 0.8,
      stone: NaN,
      wood: undefined,
      food: null
    };

    const testState = {
      ...initialState,
      iron: 1
    }

    const expectedState = {
      ...initialState,
      gold: -1,
      coal: -0.2,
      iron: 0.2
    };
    expect(resources(testState, action)).toEqual(expectedState)
  });
})