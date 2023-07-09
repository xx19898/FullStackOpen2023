import {fireEvent, render, screen } from "@testing-library/react"
import Blog from "../src/Blog"
import BlogCreationForm from "../src/BlogCreationForm"

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

test('testing that blog creation form functions as it should function gets called two times',() => {
    const createfunc = jest.fn(() => {return {status:201}});
    const mock = () => {}
    render(<BlogCreationForm createBlog={createfunc} refetchBlogs={mock} showNotification={mock} username={'test user'} token={'x133x'} />)
    
    fireEvent(
        screen.getByText('Create new blog entry'),
        new MouseEvent('click',{
            bubbles: true,
            cancelable: true,
          })
    )

    const titleInput = screen.getByLabelText('Title')
    fireEvent.change(titleInput, {target: {value: 'Test Title'}})
    
    const authorInput = screen.getByLabelText('Author')
    fireEvent.change(authorInput, {target: {value: 'Test Author'}})
    
    const urlInput = screen.getByLabelText('Url')
    fireEvent.change(urlInput, {target: {value: 'Test Url'}})
    
    fireEvent(
        screen.getByText('Create Blog'),
        new MouseEvent('click',{
            bubbles: true,
            cancelable: true,
          })
    )
    
    expect(createfunc).toHaveBeenCalledWith("test user","x133x",{author:"Test Author",title:"Test Title",url:"Test Url"});

})