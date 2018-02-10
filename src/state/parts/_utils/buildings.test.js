import buildings from '../buildings'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildings: {
    cottages: 0,
    mines: 0,
    quarries: 0,
    sawmills: 0,
    windmills: 0
  }
};

describe('buildings', () => {
  it('should return a function', () => {
    expect(typeof buildings).toBe('function');
  });
  it('should return initial state', () => {
    const action = {
      type: 'abc'
    };
    expect(buildings(undefined, action)).toEqual(initialState);
  });
  it('should set fetching to true when beginning fetch', () => {
    const action = {
      type: 'FETCH_BEGIN'
    };

    const expectedState = {
      ...initialState,
      fetching: true
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
  it('should put JSON to data when fetch succeeds', () => {
    const action = {
      type: 'FETCH_SUCCESS',
      data: {}
    };

    const testState = {
      ...initialState,
      fetching: true
    };

    const expectedState = {
      ...initialState,
      fetching: false,
      error: null,
      data: {}
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should return an error when one occurs during fetch', () => {
    const action = {
      type: 'FETCH_FAIL',
      error: 'Malformed JSON!'
    };

    const testState = {
      ...initialState,
      fetching: true,
    };

    const expectedState = {
      ...initialState,
      fetching: false,
      error: 'Malformed JSON!',
      data: null
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add cottage', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'cottage'
    };

    const expectedState = {
      ...initialState,
      buildings: {
        ...initialState.buildings,
        cottages: 1
      }
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
  it('should add mine', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'mine'
    };

    const expectedState = {
      ...initialState,
      buildings: {
        ...initialState.buildings,
        mines: 1
      }
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
  it('should add quarry', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'quarry'
    };

    const expectedState = {
      ...initialState,
      buildings: {
        ...initialState.buildings,
        quarries: 1
      }
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
  it('should add sawmill', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'sawmill'
    };

    const expectedState = {
      ...initialState,
      buildings: {
        ...initialState.buildings,
        sawmills: 1
      }
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
  it('should add windmill', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'windmill'
    };

    const expectedState = {
      ...initialState,
      buildings: {
        ...initialState.buildings,
        windmills: 1
      }
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
});