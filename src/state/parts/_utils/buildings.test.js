import buildings from '../buildings'

const initialState = {
  fetching: null,
  error: null,
  data: null,
  buildingsQuant: 0
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
      type: 'buildings/FETCH_BEGIN'
    };

    const expectedState = {
      fetching: true,
      error: null,
      data: null,
      buildingsQuant: 0
    };
    expect(buildings(initialState, action)).toEqual(expectedState);
  });
  it('should put JSON to data when fetch succeeds', () => {
    const action = {
      type: 'buildings/FETCH_SUCCESS',
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
      buildingsQuant: 0
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should set game settings', () => {

    const action = {
      type: 'buildings/SET_SETTINGS',
      data: {
        buildingsQuant: 5,
        cottages: {
          name: "Cottage",
          quantity: 0,
          cost: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          }
        }
      }
    }

    const expectedState = {
      fetching: null,
      error: null,
      data: {
        buildingsQuant: 5,
        cottages: {
          name: "Cottage",
          quantity: 0,
          cost: {
            base: 10,
            multiplier: 1.02,
            combined: 10
          }
        }
      },
      buildingsQuant: 0
    }

    expect(buildings(initialState, action)).toEqual(expectedState)
  })
  it('should return an error when one occurs during fetch', () => {
    const action = {
      type: 'buildings/FETCH_FAIL',
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
      buildingsQuant: 0
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add cottage', () => {
    const action = {
      type: 'buildings/ADD_BUILDING',
      building: 'cottages'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      cottages: {
        quantity: 0,
        cost: {
          base: 2,
          multiplier: 1.08,
          combined: 2
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
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
      buildingsQuant: 1,
      cottages: {
        quantity: 1,
        cost: {
          base: 2,
          multiplier: 1.1664,
          combined: 2.2
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add mine', () => {
    const action = {
      type: 'buildings/ADD_BUILDING',
      building: 'mines'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: 10,
          multiplier: 2,
          combined: 10
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
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
      buildingsQuant: 1,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 1,
        cost: {
          base: 10,
          multiplier: 4,
          combined: 20
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add quarry', () => {
    const action = {
      type: 'buildings/ADD_BUILDING',
      building: 'quarries'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: 1,
          multiplier: 1.2,
          combined: 1
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
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
      buildingsQuant: 1,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 1,
        cost: {
          base: 1,
          multiplier: 1.44,
          combined: 1.2
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add sawmill', () => {
    const action = {
      type: 'buildings/ADD_BUILDING',
      building: 'sawmills'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: 1000,
          multiplier: 1.849,
          combined: 1000
        }
      },
      windmills: {
        quantity: 0,
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
      buildingsQuant: 1,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 1,
        cost: {
          base: 1000,
          multiplier: 3.4188009999999998,
          combined: 1849
        }
      },
      windmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      }
    };
    expect(buildings(testState, action)).toEqual(expectedState);
  });
  it('should add windmill', () => {
    const action = {
      type: 'buildings/ADD_BUILDING',
      building: 'windmills'
    };

    const testState = {
      fetching: null,
      error: null,
      data: null,
      buildingsQuant: 0,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 0,
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
      buildingsQuant: 1,
      cottages: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      mines: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      quarries: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      sawmills: {
        quantity: 0,
        cost: {
          base: null,
          multiplier: null,
          combined: null
        }
      },
      windmills: {
        quantity: 1,
        cost: {
          base: 1000,
          multiplier: 3.4188009999999998,
          combined: 1849
        }
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