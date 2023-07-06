import React from "react"
import './App.css'

const UserInfo = ({blogs,userInfo:{token,username}}) => {
    console.log({blogs})

    return(
        <div>
            <p>{`Logged in user: ${username}`}</p>
            <ul className="blog-list">
            {
                blogs.map((blog) => {
                    return <li className="blog">
                        <p>Title: {blog.title}</p>
                        <p>Author: {blog.author}</p>
                        <p>Likes: {blog.likes}</p>
                    </li>
                })
            }
            </ul>
        </div>
    )

}

export default UserInfo