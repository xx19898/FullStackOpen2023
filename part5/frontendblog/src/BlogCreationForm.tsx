import React, { useState } from "react";
import './App.css'

const BlogCreationForm = ({createBlog,refetchBlogs,token,username}) => {
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [likes,setLikes] = useState('')

    console.log({token:token,username:username})

    return(
        <form onSubmit={async (e) => {
                e.preventDefault()
                const response = await createBlog(username,token,{title:title,author:author,likes:likes})
                if(response.status === 201) await refetchBlogs()
                else{
                    console.log(response)
                }
            }}className="blog-creation-form">
            <label className="label">Title</label><input onChange={(e) => setTitle(e.target.value)} className="input"></input>
            <label className="label">Author</label><input onChange={(e) => setAuthor(e.target.value)} className="input"></input>
            <label className="label">Likes</label><input onChange={(e) => setLikes(e.target.value)} className="input"></input>
            <button>Create Blog</button>
        </form>
    )
}

export default BlogCreationForm