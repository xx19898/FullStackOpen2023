import { useMemo } from 'react';
import './App.css';
import axios from 'axios';
import React from 'react';
import { BACKEND_URL } from './App';
import Blog from './Blog';

const UserInfo = ({ blogs, userInfo: { token, username }, refetchBlogs, showNotification }) => {

  const sortedBlogs = useMemo(
    () =>
      blogs.sort(function (a, b){
        return b.likes - a.likes;
      }),
    [blogs],
  );

  return (
    <div>
      <p>
        Logged in user: <strong> {username} </strong>
      </p>
      {blogs.length === 0 ? (
        <p>You do not have any blogs stored yet ;(</p>
      ) : (
        <ul className='blog-list'>
          {sortedBlogs.map((blog) => {
            return <Blog blog={blog} addedBy={username} like={like} deleteBlog={deleteBlog} key={blog._id} token={token} />
          })}
        </ul>
      )}
    </div>
  );

  async function like(blogId, blog,authToken) {
    const response = await axios({
      url: `${BACKEND_URL}/api/blogs/${blogId}`,
      method: 'put',
      data: { blog },
      withCredentials: false,
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (response.status === 200) {
      await refetchBlogs(authToken);
    } else {
      showNotification('Could not like');
    }
  }

  async function deleteBlog(blogId,authToken) {
    const response = await axios({
      url: `${BACKEND_URL}/api/blogs/${blogId}`,
      method: 'delete',
      withCredentials: false,
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (response.status === 200) {
      await refetchBlogs(authToken);
      showNotification(`Deleted blog with id ${blogId}`);
    } else {
      showNotification('Could not delete');
    }
  }
};

export default UserInfo;
