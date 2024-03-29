import { useState } from 'react';
import './App.css';
import axios from 'axios';
import UserInfo from './UserInfo';
import BlogCreationForm from './BlogCreationForm';
import Notification from './Notification';

export const BACKEND_URL = 'http://localhost:80';

export function App() {

  const [loginState, setLoginState] = useState('inProcess');
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [notificationActive, setNotificationActive] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  const loggedInInfo = loginState === 'success' ? JSON.parse(localStorage.getItem('loggedInInfo')) : null;

  return (
    <div className='main'>
      {notificationActive ? <Notification text={notificationText} /> : null}
      {loginState === 'success' ? (
        <button onClick={() => logout()}>Log out</button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className='form'
        >
          <label>Username</label>
          <input id="usernameInputLogin" onChange={(e) => setUsername(e.target.value)}></input>
          <label>Password</label>
          <input id="passwordInputLogin" type='password' onChange={(e) => setPassword(e.target.value)}></input>
          <button type='submit' className='login-button'>
            Login
          </button>
        </form>
      )}
      {loginState === 'success' ? (
        <>
          <UserInfo
            blogs={blogs}
            userInfo={loggedInInfo}
            showNotification={showNotification}
            refetchBlogs={refetchBlogs}
          />
          <BlogCreationForm
            refetchBlogs={refetchBlogs}
            showNotification={showNotification}
            createBlog={createBlog}
            token={loggedInInfo.token}
            username={loggedInInfo.username}
          />
        </>
      ) : (
        <p>Login unsuccessful,please check your credentials</p>
      )}
    </div>
  );

  async function handleSubmit() {
    try {
      const response = await signIn(username, password);
      if (response.status === 200) {
        const blogs = await getBlogs(response.data.token);
        setBlogs(blogs);
        setLoginState('success');
        localStorage.setItem(
          'loggedInInfo',
          JSON.stringify({ token: response.data.token, username: response.data.username }),
        );
        showNotification('Login successful', 'success');
      } else {
        setLoginState('failed');
        showNotification('Login failed, please check your credentials', 'failure');
      }
    } catch (e) {
      showNotification(e.message);
    }
  }

  async function signIn(username, password) {
    const response = await axios({
      method: 'post',
      url: `${BACKEND_URL}/api/users/login`,
      data: { username: username, password: password },
      withCredentials: false,
    });
    return response;
  }

  async function refetchBlogs(authToken){
    const response = await getBlogs(authToken);
    setBlogs(response);
  }

  async function getBlogs(token) {
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

  function createBlog(username, token, blog) {
    const response = axios({
      method: 'post',
      url: `${BACKEND_URL}/api/blogs`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        blog,
      },
    });
    return response;
  }

  async function showNotification(text) {
    setNotificationText(text);
    setNotificationActive(true);
    setTimeout(() => setNotificationActive(false), 4000);
  }

  async function logout() {
    setLoginState('inProcess');
    setUsername('');
    setPassword('');
    localStorage.setItem('loggedInInfo', { username: null, token: null });
  }
}


export function getUserInfo(){
  const userInfo = localStorage.getItem(
    'loggedInInfo'
  );
  return userInfo
}
