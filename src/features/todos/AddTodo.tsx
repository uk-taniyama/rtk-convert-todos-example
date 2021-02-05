import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './todosSlice'

type AddTodoProps = {
  addTodo: (text: string) => void
}

const AddTodo: FC<AddTodoProps> = ({ addTodo }) => {
  const [todoText, setTodoText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value)

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!todoText.trim()) {
            return
          }
          addTodo(todoText)
          setTodoText('')
        }}
      >
        <input value={todoText} onChange={onChange} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = { addTodo }

export default connect(null, mapDispatchToProps)(AddTodo)
