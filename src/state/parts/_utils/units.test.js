import units from '../units'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  unitLimit: 5,
  units: 0,
  miners: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  quarriers: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  lumberjacks: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
  },
  farmers: {
    quantity: 0,
    efficiency: 0.2,
    cost: {
      base: null,
      multiplier: null,
      combined: null
    }
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
      worker: 'miners'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 0,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 1,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState);
  });
  it('should add quarrier worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'quarriers'
  };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 0,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 1,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState);
  });
  it('should add lumberjack worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'lumberjacks'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 0,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 1,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState);
  });
  it('should add farmer worker', () => {
    const action = {
      type: 'ADD_WORKER',
      worker: 'farmers'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 0,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 1,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState);
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
      worker: 'miners'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 5,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(testState);
  });
  it('should increase miner efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'miners',
      value: 0.1
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.3,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState)
  });
  it('should increase quarrier efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'quarriers',
      value: 0.7
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.9,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState)
  });
  it('should increase lumberjack efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'lumberjacks',
      value: 0.01
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState)
  });
  it('should increase farmer efficiency', () => {
    const action = {
      type: 'INCREASE_WORKER_EFFICIENCY',
      worker: 'farmers',
      value: 1
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 5,
      units: 1,
      miners: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarriers: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      lumberjacks: {
        quantity: 0,
        efficiency: 0.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      farmers: {
        quantity: 0,
        efficiency: 1.2,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState)
  });
});

/**
 * for some reason tests for each building when launched through
 * expect(buildings(initialState, action)).toEqual(expectedState);
 * expected a currently tested building number to be 1 and all the
 * PREVIOUS ones
 * No idea why tho
 **/