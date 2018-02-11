import units from '../units'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: 5,
  units: 0,
  efficiency: {
    miners: 0.2,
    quarriers: 0.2,
    lumberjacks: 0.2,
    farmers: 0.2
  },
  workers: {
    miners: 0,
    quarriers: 0,
    lumberjacks: 0,
    farmers: 0,
  }
}

describe('units', () => {
  it('should return a function', () => {
    expect(typeof units).toBe('function');
  });
  it('should return initial state', () => {
    const action = {
      type: 'abc'
    };
    expect(units(undefined, action)).toEqual(initialState);
  });
  it('should set fetching to true when beginning fetch', () => {
    const action = {
      type: 'FETCH_BEGIN'
    };

    const expectedState = {
      ...initialState,
      fetching: true
    };
    expect(units(initialState, action)).toEqual(expectedState)
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
    expect(units(testState, action)).toEqual(expectedState);
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
    expect(units(testState, action)).toEqual(expectedState);
  });
  it('should add miner worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'miner'
    };

    const expectedState = {
      ...initialState,
      units: 1,
      workers: {
        ...initialState.workers,
        miners: 1
      }
    };
    expect(units(initialState, action)).toEqual(expectedState);
  });
  it('should add quarrier worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'quarrier'
  };

    const expectedState = {
      ...initialState,
      units: 1,
      workers: {
        ...initialState.workers,
        quarriers: 1
      }
    };
    expect(units(initialState, action)).toEqual(expectedState);
  });
  it('should add lumberjack worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'lumberjack'
    };

    const expectedState = {
      ...initialState,
      units: 1,
      workers: {
        ...initialState.workers,
        lumberjacks: 1
      }
    };
    expect(units(initialState, action)).toEqual(expectedState);
  });
  it('should add farmer worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'farmer'
    };

    const expectedState = {
      ...initialState,
      units: 1,
      workers: {
        ...initialState.workers,
        farmers: 1
      }
    };
    expect(units(initialState, action)).toEqual(expectedState);
  });
  it('should increase unit limit', () => {
    const action = {
      type: 'INCREASE_UNIT_LIMIT',
      value: 10,
    };

    const expectedState = {
      ...initialState,
      unitLimit: 15
    };
    expect(units(initialState, action)).toEqual(expectedState)
  });
  it('should not exceed unit limit', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'miner'
    };

    const testState = {
      ...initialState,
      units: 5
    };
    expect(units(testState, action)).toEqual(testState);
  });
  it('should increase miner efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'miner',
      value: 0.1
    };

    const expectedState = {
      ...initialState,
      efficiency: {
        ...initialState.efficiency,
        miners: 0.3
      }
    };
    expect(units(initialState, action)).toEqual(expectedState)
  });
  it('should increase quarrier efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'quarrier',
      value: 0.1
    };

    const expectedState = {
      ...initialState,
      efficiency: {
        ...initialState.efficiency,
        quarriers: 0.3
      }
    };
    expect(units(initialState, action)).toEqual(expectedState)
  });
  it('should increase lumberjack efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'lumberjack',
      value: 0.1
    };

    const expectedState = {
      ...initialState,
      efficiency: {
        ...initialState.efficiency,
        lumberjacks: 0.3
      }
    };
    expect(units(initialState, action)).toEqual(expectedState)
  });
  it('should increase farmer efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'farmer',
      value: 0.1
    };

    const expectedState = {
      ...initialState,
      efficiency: {
        ...initialState.efficiency,
        farmers: 0.3
      }
    };
    expect(units(initialState, action)).toEqual(expectedState)
  });
});