import { useContext, useState } from 'react';
import '../../App.css';
import PropTypes from 'prop-types';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <li className='blog'>
      <p>
        Title: <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </p>
      <p>Author: {blog.author}</p>
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
