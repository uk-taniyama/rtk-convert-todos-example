import todos, { addTodo, toggleTodo } from './todosSlice'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, { type: '$$$' })).toEqual({ entities: {}, ids: [] })
  })

  it('should handle ADD_TODO', () => {
    expect(
      todos(undefined, {
        type: addTodo.type,
        payload: {
          text: 'Run the tests',
          id: 1,
        },
      })
    ).toEqual({
      entities: {
        1: {
          text: 'Run the tests',
          completed: false,
          id: 1,
        },
      },
      ids: [1],
    })

    expect(
      todos(
        {
          entities: {
            1: {
              text: 'Run the tests',
              completed: false,
              id: 1,
            },
          },
          ids: [1],
        },
        {
          type: addTodo.type,
          payload: {
            text: 'Use Redux',
            id: 2,
          },
        }
      )
    ).toEqual({
      entities: {
        1: {
          text: 'Run the tests',
          completed: false,
          id: 1,
        },
        2: {
          text: 'Use Redux',
          completed: false,
          id: 2,
        },
      },
      ids: [1, 2],
    })

    expect(
      todos(
        {
          entities: {
            1: {
              text: 'Run the tests',
              completed: false,
              id: 1,
            },
            2: {
              text: 'Use Redux',
              completed: false,
              id: 2,
            },
          },
          ids: [1, 2],
        },
        {
          type: addTodo.type,
          payload: {
            text: 'Fix the tests',
            id: 3,
          },
        }
      )
    ).toEqual({
      entities: {
        1: {
          text: 'Run the tests',
          completed: false,
          id: 1,
        },
        2: {
          text: 'Use Redux',
          completed: false,
          id: 2,
        },
        3: {
          text: 'Fix the tests',
          completed: false,
          id: 3,
        },
      },
      ids: [1, 2, 3],
    })
  })

  it('should handle TOGGLE_TODO', () => {
    expect(
      todos(
        {
          entities: {
            1: {
              text: 'Run the tests',
              completed: false,
              id: 1,
            },
            2: {
              text: 'Use Redux',
              completed: false,
              id: 2,
            },
          },
          ids: [1, 2],
        },
        {
          type: toggleTodo.type,
          payload: 1,
        }
      )
    ).toEqual({
      entities: {
        1: {
          text: 'Run the tests',
          completed: true,
          id: 1,
        },
        2: {
          text: 'Use Redux',
          completed: false,
          id: 2,
        },
      },
      ids: [1, 2],
    })
  })
})

describe('addTodo', () => {
  it('should generate incrementing todo IDs', () => {
    const action1 = addTodo('a')
    const action2 = addTodo('b')

    expect(action1.payload).toEqual({ id: 0, text: 'a' })
    expect(action2.payload).toEqual({ id: 1, text: 'b' })
  })
})
