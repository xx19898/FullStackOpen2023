import React from "react"
import './App.css'
import Blog from "./Blog"
import axios from "axios"
import { BACKEND_URL } from "./App"

const UserInfo = ({blogs,userInfo:{token,username},refetchBlogs,showNotification}) => {
    console.log({blogs})

    return(
        <div>
            <p>Logged in user: <strong> {username} </strong></p>
            <ul className="blog-list">
            {
                blogs.map((blog) => {
                    return <Blog blog={blog} like={like} key={blog._id}/>
                })
            }
            </ul>
        </div>
    )

    async function like(blogId,blog){
        const response = await axios({
            url:`${BACKEND_URL}/api/blogs/like`,
            method:'put',
            data:{blogId},
            withCredentials:false,
            headers:{Authorization: `Bearer ${token}`}})
        if(response.status === 200){
            await refetchBlogs()
        }else{
            showNotification('Could not like')
        }            

    }

}

export default UserInfo