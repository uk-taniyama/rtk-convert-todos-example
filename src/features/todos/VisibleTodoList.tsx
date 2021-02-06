import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
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

const mapStateToProps = (state: RootState) => ({
  todos: selectVisibleTodos(state),
})

const mapDispatchToProps = { toggleTodo }

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
