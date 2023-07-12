import { useContext, useState } from 'react';
import '../../App.css';
import PropTypes from 'prop-types';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

const Blog = ({ blog, like, deleteBlog, addedBy }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);

  const { state } = useContext(AppContext);
  const token = state.userInfo.token;

  return (
    <li className='blog'>
      <button onClick={() => setShowFullInfo(!showFullInfo)}>
        {showFullInfo ? 'Hide' : 'View'}
      </button>
      <p>
        Title: <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </p>
      <p>Author: {blog.author}</p>
      {showFullInfo ? (
        <>
          <p>Likes: {blog.likes === undefined ? 0 : blog.likes}</p>
          <button
            onClick={() =>
              like({
                blogId: blog._id,
                blog: { ...blog, likes: blog.likes === undefined ? 1 : blog.likes + 1 },
                token: token,
              })
            }
          >
            Like
          </button>
          <p>Url: {blog.url}</p>
          <p>Added by: {blog.user.username}</p>
          {addedBy === blog.user.username ? (
            <button onClick={() => deleteBlog({ blogId: blog._id, token: token })}>Delete</button>
          ) : null}
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
};

export default Blog;
