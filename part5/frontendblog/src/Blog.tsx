import { useState } from "react"
import React from "react"
import './App.css'

const Blog = ({blog,like}) => {
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
                    <button onClick={() => like()}>Like</button>
                    <p>Url: {blog.url}</p>
                </>
                :
                null 
            }
        </li>
        
    )
}

export default Blog