import React, { FC } from 'react'
import Todo from './Todo'

type TodoItem = {
  id: number
  completed: boolean
  text: string
}

type TodoListProps = {
  todos: TodoItem[]
  toggleTodo: (id: number) => void
}

const TodoList: FC<TodoListProps> = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)

export default TodoList
