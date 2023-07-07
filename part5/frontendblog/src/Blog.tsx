import { useState } from "react"
import React from "react"
import './App.css'

const Blog = ({blog,like,deleteBlog}) => {
    const [showFullInfo,setShowFullInfo] = useState(false)

    return(
        <li className="blog">
            <button onClick={(e) => setShowFullInfo(!showFullInfo)}>{showFullInfo ? 'Hide' : 'View'}</button>
            <p>Title: {blog.title}</p>
            <p>Author: {blog.author}</p>
            {
                showFullInfo ? 
                <>
                    <p>Likes: {blog.likes === undefined ? 0 : blog.likes}</p>
                    <button onClick={() => like(blog._id,{blog,likes: blog.likes === undefined ? 1 : blog.likes + 1})}>Like</button>
                    <p>Url: {blog.url}</p>
                    <button onClick={(e) => deleteBlog(blog._id)}>Delete</button>
                </>
                :
                null 
            }
        </li>)
}

export default Blog