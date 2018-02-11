import buildings from '../buildings'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: 0,
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
      fetching: true,
      error: null,
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
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
      fetching: false,
      error: null,
      data: {},
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
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
      fetching: false,
      error: 'Malformed JSON!',
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add cottage', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'cottages'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 1,
      buildings: {
        cottages: 1,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add mine', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'mines'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 1,
      buildings: {
        cottages: 0,
        mines: 1,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add quarry', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'quarries'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 1,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 1,
        sawmills: 0,
        windmills: 0
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add sawmill', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'sawmills'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 1,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 1,
        windmills: 0
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add windmill', () => {
    const action = {
      type: 'ADD_BUILDING',
      building: 'windmills'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 0
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 1,
      buildings: {
        cottages: 0,
        mines: 0,
        quarries: 0,
        sawmills: 0,
        windmills: 1
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
});

/**
 * for some reason tests for each building when launched through
 * expect(buildings(initialState, action)).toEqual(expectedState);
 * expected a currently tested building number to be 1 and all the
 * PREVIOUS ones
 * No idea why tho
 **/