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
      type: 'units/FETCH_BEGIN'
    };

    const expectedState = {
      ...initialState,
      fetching: true
    };
    expect(units(initialState, action)).toEqual(expectedState)
  });
  it('should put JSON to data when fetch succeeds', () => {
    const action = {
      type: 'units/FETCH_SUCCESS',
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
  it('should set game settings', () => {
    const action = {
      type: 'units/SET_SETTINGS',
      data: {
        unitLimit: 20,
        units: 0,
        miners: {
          name: "Miner",
          quantity: 0,
          efficiency: 0.2,
          cost: {
            gold: {
              base: 10,
              multiplier: 1.02,
              combined: 10
            },
            coal: {
              base: 10,
              multiplier: 1.02,
              combined: 10
            },
            iron: {
              base: 10,
              multiplier: 1.02,
              combined: 10
            },
            stone: {
              base: 10,
              multiplier: 1.02,
              combined: 10
            },
            wood: {
              base: 10,
              multiplier: 1.02,
              combined: 10
            },
            food: {
              base: 10,
              multiplier: 1.02,
              combined: 10
            }
          }
        },
        quarriers: {
          name: "Quarrier",
          quantity: 0,
          efficiency: 0.2,
          gold: {
            base: 12,
            multiplier: 1.08,
            combined: 12
          },
          coal: {
            base: 12,
            multiplier: 1.08,
            combined: 12
          },
          iron: {
            base: 12,
            multiplier: 1.08,
            combined: 12
          },
          stone: {
            base: 12,
            multiplier: 1.08,
            combined: 12
          },
          wood: {
            base: 12,
            multiplier: 1.08,
            combined: 12
          },
          food: {
            base: 12,
            multiplier: 1.08,
            combined: 12
          }
        },
        lumberjacks: {
          name: "Lumberjack",
          quantity: 0,
          efficiency: 0.2,
          cost: {
            gold: {
              base: 20,
              multiplier: 1.001,
              combined: 20
            },
            coal: {
              base: 20,
              multiplier: 1.001,
              combined: 20
            },
            iron: {
              base: 20,
              multiplier: 1.001,
              combined: 20
            },
            stone: {
              base: 20,
              multiplier: 1.001,
              combined: 20
            },
            wood: {
              base: 20,
              multiplier: 1.001,
              combined: 20
            },
            food: {
              base: 20,
              multiplier: 1.001,
              combined: 20
            }
          }
        },
        farmers: {
          name: "Farmer",
          quantity: 0,
          efficiency: 0.2,
          cost: {
            gold: {
              base: 1,
              multiplier: 1.9,
              combined: 1
            },
            coal: {
              base: 1,
              multiplier: 1.9,
              combined: 1
            },
            iron: {
              base: 1,
              multiplier: 1.9,
              combined: 1
            },
            stone: {
              base: 1,
              multiplier: 1.9,
              combined: 1
            },
            wood: {
              base: 1,
              multiplier: 1.9,
              combined: 1
            },
            food: {
              base: 1,
              multiplier: 1.9,
              combined: 1
            }
          }
        }
      }
    }

    const expectedState = {
      fetching: null,
      error: null,
      data: null,
      unitLimit: 20,
      units: 0,
      miners: {
        name: "Miner",
        quantity: 0,
        efficiency: 0.2,
        cost: {
          gold: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          },
          coal: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          },
          iron: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          },
          stone: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          },
          wood: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          },
          food: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          }
        }
      },
      quarriers: {
        name: "Quarrier",
        quantity: 0,
        efficiency: 0.2,
        gold: {
          base: 12,
          multiplier: 1.08,
          combined: 12
        },
        coal: {
          base: 12,
          multiplier: 1.08,
          combined: 12
        },
        iron: {
          base: 12,
          multiplier: 1.08,
          combined: 12
        },
        stone: {
          base: 12,
          multiplier: 1.08,
          combined: 12
        },
        wood: {
          base: 12,
          multiplier: 1.08,
          combined: 12
        },
        food: {
          base: 12,
          multiplier: 1.08,
          combined: 12
        }
      },
      lumberjacks: {
        name: "Lumberjack",
        quantity: 0,
        efficiency: 0.2,
        cost: {
          gold: {
            base: 20,
            multiplier: 1.001,
            combined: 20
          },
          coal: {
            base: 20,
            multiplier: 1.001,
            combined: 20
          },
          iron: {
            base: 20,
            multiplier: 1.001,
            combined: 20
          },
          stone: {
            base: 20,
            multiplier: 1.001,
            combined: 20
          },
          wood: {
            base: 20,
            multiplier: 1.001,
            combined: 20
          },
          food: {
            base: 20,
            multiplier: 1.001,
            combined: 20
          }
        }
      },
      farmers: {
        name: "Farmer",
        quantity: 0,
        efficiency: 0.2,
        cost: {
          gold: {
            base: 1,
            multiplier: 1.9,
            combined: 1
          },
          coal: {
            base: 1,
            multiplier: 1.9,
            combined: 1
          },
          iron: {
            base: 1,
            multiplier: 1.9,
            combined: 1
          },
          stone: {
            base: 1,
            multiplier: 1.9,
            combined: 1
          },
          wood: {
            base: 1,
            multiplier: 1.9,
            combined: 1
          },
          food: {
            base: 1,
            multiplier: 1.9,
            combined: 1
          }
        }
      }
    }
    expect(units(initialState, action)).toEqual(expectedState)
  });
  it('should return an error when one occurs during fetch', () => {
    const action = {
      type: 'units/FETCH_FAIL',
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
      type: 'units/ADD_WORKER',
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
          base: 2,
          multiplier: 1.08,
          combined: 2
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
          base: 2,
          multiplier: 1.1664,
          combined: 2.2
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
      type: 'units/ADD_WORKER',
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
          base: 10,
          multiplier: 2,
          combined: 10
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
          base: 10,
          multiplier: 4,
          combined: 20
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
      type: 'units/ADD_WORKER',
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
          base: 1,
          multiplier: 1.2,
          combined: 1
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
          base: 1,
          multiplier: 1.44,
          combined: 1.2
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
      type: 'units/ADD_WORKER',
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
          base: 1000,
          multiplier: 1.849,
          combined: 1000
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
          base: 1000,
          multiplier: 3.4188009999999998,
          combined: 1849
        }
      }
    };
    expect(units(testState, action)).toEqual(expectedState);
  });
  it('should increase unit limit', () => {
    const action = {
      type: 'units/INCREASE_UNIT_LIMIT',
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
      type: 'units/ADD_WORKER',
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
          base: 10,
          multiplier: 2.44832,
          combined: 20.7
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
      type: 'units/INCREASE_WORKER_EFFICIENCY',
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
      type: 'units/INCREASE_WORKER_EFFICIENCY',
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
      type: 'units/INCREASE_WORKER_EFFICIENCY',
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
      type: 'units/INCREASE_WORKER_EFFICIENCY',
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