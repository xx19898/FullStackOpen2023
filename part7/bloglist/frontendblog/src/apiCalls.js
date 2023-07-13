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

export async function getBlogDetailed({blogId,token}){
  
  const response = await axios({
    method: 'get',
    url: `${BACKEND_URL}/api/blogs/${blogId}`,
    withCredentials: false,
    headers: {
      Authorization: `Bearer ${token}`,
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

  return response;
}

export async function like({ blog, token }) {
  const response = await axios({
    url: `${BACKEND_URL}/api/blogs/${blog._id}`,
    method: 'put',
    data: { blog:{...blog,likes:blog.likes + 1} },
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

export async function getUsersInfo({token}){
  const response = await axios({
    url: `${BACKEND_URL}/api/users/userInfo`,
    method: 'get',
    withCredentials: false,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
}

export async function getUserDetailedInfo({token,userId}){
  const response = await axios({
    url: `${BACKEND_URL}/api/blogs/user/${userId}`,
    method: 'get',
    withCredentials: false,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
}

export async function addNewComment({token,blogId,comment}){
  const response = await axios({
    url : `${BACKEND_URL}/api/blogs/comment/${blogId}`,
    method: 'post',
    data:{comment:comment},
    withCredentials:false,
    headers: { Authorization: `Bearer ${token}` },
  })
  return response;
}
