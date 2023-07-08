import {fireEvent, render, screen } from "@testing-library/react"
import Blog from "../src/Blog"
import React from "react"

test('blog component',() => {
    render(<Blog addedBy="testUser" blog={{likes:10,url:'www.test.com',title:'Test Title',author:'test author',user:{username:'test user'}}} like={() => {return {}}} deleteBlog={() => {return {}}}/>)

    const title = screen.getByText('Title: Test Title')
    const author = screen.getByText('Author: test author')
    const url = screen.queryByText('Url: www.test.com')
    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).toBe(null)
})

test('testing that hiding/viewing blog info button works',() => {
    render(<Blog addedBy="testUser" blog={{likes:10,url:'www.test.com',title:'Test Title',author:'test author',user:{username:'test user'}}} like={() => {return {}}} deleteBlog={() => {return {}}}/>)

    fireEvent(
        screen.getByText('View'),
        new MouseEvent('click',{
            bubbles: true,
            cancelable: true,
          })
    )

    const url = screen.queryByText('Url: www.test.com')
    const likes = screen.queryByText('Likes: 10')
    const addedby = screen.queryByText('Added by: test user')

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(addedby).toBeVisible()
})

test('testing that like function gets called two times',() => {
    const likefunc = jest.fn();
    render(<Blog addedBy="testUser" blog={{likes:10,url:'www.test.com',title:'Test Title',author:'test author',user:{username:'test user'}}} like={likefunc} deleteBlog={() => {return {}}}/>)
    
    fireEvent(
        screen.getByText('View'),
        new MouseEvent('click',{
            bubbles: true,
            cancelable: true,
          })
    )

    fireEvent(
        screen.getByText('Like'),
        new MouseEvent('click',{
            bubbles: true,
            cancelable: true,
          })
    )
    fireEvent(
        screen.getByText('Like'),
        new MouseEvent('click',{
            bubbles: true,
            cancelable: true,
          })
    )

    
    expect(likefunc).toHaveBeenCalledTimes(2);

})