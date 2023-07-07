import React, { useState } from "react";
import './App.css'

const BlogCreationForm = ({createBlog,refetchBlogs,token,username,showNotification}) => {
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const [formVisible,setFormVisible] = useState(false)

    console.log({token:token,username:username})

    return(
        <div>
            <button onClick={(e) => setFormVisible(!formVisible)}>{ formVisible ? 'Hide blog creation form' : 'Create new blog entry'}</button>
            {
                formVisible ? <form onSubmit={async (e) => {
                    e.preventDefault()
                    const response = await createBlog(username,token,{title:title,author:author,url:url})
                    if(response.status === 201){
                        showNotification(`Successfully added ${title} to the blog list`,'success')
                        await refetchBlogs()
                        setFormVisible(false)
                    }
                    else{
                        console.log(response)
                        showNotification(response.data,'failure')
                    }
                }}className="blog-creation-form">
                <label className="label">Title</label><input onChange={(e) => setTitle(e.target.value)} className="input"></input>
                <label className="label">Author</label><input onChange={(e) => setAuthor(e.target.value)} className="input"></input>
                <label className="label">Url</label><input onChange={(e) => setUrl(e.target.value)} className="input"></input>
                <button>Create Blog</button>
            </form>
            :
            null
            }
            
        </div>
        
    )
}

export default BlogCreationForm