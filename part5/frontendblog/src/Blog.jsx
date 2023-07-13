import { useState, useContext } from 'react';
import React from 'react';
import './App.css';
import PropTypes from 'prop-types'
import { AppContext } from '../../../part7/bloglist/frontendblog/src/App';

const Blog = ({ blog, like, deleteBlog,addedBy,key}) => {
  const [showFullInfo, setShowFullInfo] = useState(false);
  const { state } = useContext(AppContext)
  console.log('BLOG')
  console.log({tokenz:token})
  return (
    <li className='blog' key={key}>
      <button onClick={(e) => setShowFullInfo(!showFullInfo)}>
        {showFullInfo ? 'Hide' : 'View'}
      </button>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      {showFullInfo ? (
        <>
          <p>Likes: {blog.likes === undefined ? 0 : blog.likes}</p>
          <button
            onClick={() =>
              like({blogId:blog._id,blog: {...blog, likes: blog.likes === undefined ? 1 : blog.likes + 1 },token:token})
            }
          >
            Like
          </button>
          <p>Url: {blog.url}</p>
          <p>Added by: {blog.user.username}</p>
          {
            addedBy === blog.user.username ? <button onClick={(e) => deleteBlog(blog._id)}>Delete</button> : null 
          }
        </>
      ) : null}
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  addedBy: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
}

export Blog

