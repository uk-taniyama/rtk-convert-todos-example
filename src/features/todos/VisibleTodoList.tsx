import { FC, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { todosSelectors, toggleTodo } from '../todos/todosSlice'
import TodoList from './TodoList'
import { VisibilityFilters } from '../filters/filtersSlice'
import { RootState } from '../../store'

const selectTodos = (state: RootState) => state.todos
const selectFilter = (state: RootState) => state.visibilityFilter

const selectTodosAll = createSelector(selectTodos, (state) =>
  todosSelectors.selectAll(state)
)

const selectToById = createSelector(
  selectTodos,
  (_: any, todoId: number) => todoId,
  (todosState, todoId) => todosSelectors.selectById(todosState, todoId)
)

const selectVisibleTodos = createSelector(
  [selectTodosAll, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((t) => t.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((t) => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
)

const VisibleTodoList: FC = ({ ...props }) => {
  const todos = useSelector(selectVisibleTodos)
  const dispatch = useDispatch()
  const actions = useMemo(() => bindActionCreators({ toggleTodo }, dispatch), [
    dispatch,
  ])
  return <TodoList todos={todos} toggleTodo={actions.toggleTodo} {...props} />
}

export default VisibleTodoList
