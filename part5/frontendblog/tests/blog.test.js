import {act, fireEvent, render, screen } from "@testing-library/react"
import Blog from "../src/Blog"
import BlogCreationForm from "../src/BlogCreationForm"
import React from "react"

test('blog component is visible',() => {
    render(<Blog addedBy="testUser" token="testToken" blog={{likes:10,url:'www.test.com',title:'Test Title',author:'test author',user:{username:'test user'}}} like={() => {return {}}} deleteBlog={() => {return {}}}/>)
    const title = screen.getByText('Title: Test Title')
    const author = screen.getByText('Author: test author')
    const url = screen.queryByText('Url: www.test.com')
    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).toBe(null)
})

test('testing that hiding/viewing blog info button works',() => {
    render(<Blog addedBy="testUser" token="testToken" blog={{likes:10,url:'www.test.com',title:'Test Title',author:'test author',user:{username:'test user'}}} like={() => {return {}}} deleteBlog={() => {return {}}}/>)


    act(() => {
        fireEvent(
            screen.getByText('View'),
            new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
              })
        )
    })

    const url = screen.queryByText('Url: www.test.com')
    const likes = screen.queryByText('Likes: 10')
    const addedby = screen.queryByText('Added by: test user')

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(addedby).toBeVisible()
})
//TODO: turns out part5 was not fixed after all, problem is with like function and the token parameter that it gets fed with.
//TODO: find out whether token auth is even a part of the exercise and fix it and the rest of the errors
test('testing that like function gets called two times',() => {
    const likefunc = jest.fn();
    render(<Blog addedBy="testUser" token="testToken" blog={{
        likes:10,url:'www.test.com',title:'Test Title',
        author:'test author',user:{username:'test user'}}}
         like={likefunc} deleteBlog={() => {return {}}}
        />)

    const viewButton = screen.getByText('View')

    act(() => {
        fireEvent(
            viewButton,
            new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
              })
    )})

    const likeButton = screen.getByText('Like')


    act(() => {

        fireEvent(
            likeButton,
            new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
              })
        )
        fireEvent(
            likeButton,
            new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
              })
        )
    })

    expect(likefunc).toHaveBeenCalledTimes(2);

})

test('testing that blog creation form functions as it should',() => {
    const createfunc = jest.fn(() => {return {status:201}});

    const mock = () => {}

    render(<BlogCreationForm createBlog={createfunc} refetchBlogs={mock} showNotification={mock} username={'test user'} token={'x133x'} />)

        act(() => {
            fireEvent(
                screen.getByText('Create new blog entry'),
                new MouseEvent('click',{
                    bubbles: true,
                    cancelable: true,
                  })
            )
        })


        const titleInput = screen.getByLabelText('Title')

        act(() => {
            fireEvent.change(titleInput, {target: {value: 'Test Title'}})
        });


        const authorInput = screen.getByLabelText('Author')

        act(() => {
            fireEvent.change(authorInput, {target: {value: 'Test Author'}})
        })


        const urlInput = screen.getByLabelText('Url')

        act(() => {
            fireEvent.change(urlInput, {target: {value: 'Test Url'}})

            fireEvent(
                screen.getByText('Create Blog'),
                new MouseEvent('click',{
                    bubbles: true,
                    cancelable: true,
                })
            )
        })

    expect(createfunc).toHaveBeenCalledWith("test user","x133x",{author:"Test Author",title:"Test Title",url:"Test Url"});

})