import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

let nextTodoId = 0

export type TodoItem = {
  id: number
  completed: boolean
  text: string
}

export const todosAdapter = createEntityAdapter<TodoItem>()

export const todosSelectors = todosAdapter.getSelectors()

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<{ id: number; text: string }>) {
        const { id, text } = action.payload
        todosAdapter.addOne(state, { id, text, completed: false })
      },
      prepare(text: string) {
        return { payload: { text, id: nextTodoId++ } }
      },
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const id = action.payload
      const todo = todosAdapter.getSelectors().selectById(state, id)
      if (todo) {
        // todo.completed = !todo.completed;
        todosAdapter.updateOne(state, {
          id,
          changes: {
            completed: !todo.completed,
          },
        })
      }
    },
  },
})

export const { addTodo, toggleTodo } = todosSlice.actions

export default todosSlice.reducer
