import React, { FC } from 'react'

type TodoProps = {
  completed: boolean
  text: string
  onClick: () => void
}

const Todo: FC<TodoProps> = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
)

export default Todo
