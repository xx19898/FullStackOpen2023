import {render, screen} from '@testing-library/react'
import Todo from '../src/Todos/Todo'
import '@testing-library/jest-dom'
import React from 'react'

test('displays correct name for the todo',async () => {
    const testTodo = {text: 'Test todo',done: true}
    render(<Todo todo={testTodo} onClickComplete={() => console.log('complete')} onClickDelete={() => console.log('delete')}/>)

    expect(screen.getByText('Test todo')).toBeInTheDocument()
})