import { useState, useContext } from 'react';
import React from 'react';
import './App.css';
import PropTypes from 'prop-types'

const Blog = ({ blog, like, deleteBlog,addedBy,token }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);
  return (
    <li className='blog'>
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
              like(blog._id,{...blog, likes: blog.likes === undefined ? 1 : blog.likes + 1 },token)
            }
          >
            Like
          </button>
          <p>Url: {blog.url}</p>
          <p>Added by: {blog.user.username}</p>
          {
            addedBy === blog.user.username ? <button onClick={(e) => deleteBlog(blog._id,token)}>Delete</button> : null
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
  token: PropTypes.string.isRequired,
}

export default Blog

