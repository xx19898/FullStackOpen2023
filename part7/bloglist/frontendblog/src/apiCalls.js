/* eslint-disable prettier/prettier */
import axios from 'axios';
import { BACKEND_URL } from './App';

export async function signIn(blog) {
  const response = await axios({
    method: 'post',
    url: `${BACKEND_URL}/api/users/login`,
    data: { ...blog },
    withCredentials: false,
  });
  return response;
}

export async function createBlog({blog,token}) {
  const response = await axios({
    method: 'post',
    url: `${BACKEND_URL}/api/blogs`,
    withCredentials: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      blog,
    },
  });
  return response;
}

export async function getBlogs({token}) {
  const response = await axios({
    method: 'get',
    url: `${BACKEND_URL}/api/blogs`,
    withCredentials: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function like({ blogId, blog, token }) {
  console.log({blogId})
  console.log({blog})
  console.log({token})
  const response = await axios({
    url: `${BACKEND_URL}/api/blogs/${blogId}`,
    method: 'put',
    data: { blog },
    withCredentials: false,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}

export async function deleteBlog({ blogId, token }) {
  const response = await axios({
    url: `${BACKEND_URL}/api/blogs/${blogId}`,
    method: 'delete',
    withCredentials: false,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}
