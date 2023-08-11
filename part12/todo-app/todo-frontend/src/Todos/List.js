import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <div style={{backgroundColor:'pink'}}>
      {todos.map(todo => {
        return <Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </div>
  )
}

export default TodoList
