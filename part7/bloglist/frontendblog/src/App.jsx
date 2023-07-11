import React, { useState } from 'react';
import './App.css';
import UserInfo from './UserInfo';
import BlogCreationForm from './BlogCreationForm';
import Notification from './Notification';
import { useReducer } from 'react';
import { useMutation } from 'react-query';
import { signIn } from './apiCalls';

export const BACKEND_URL = 'http://localhost:80';

const initialAppState = {
  blogs: [],
  notification: { text: '', type: 'NONE', status: false },
  userInfo: { token: null, username: null },
};

export const AppContext = React.createContext(null);

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'SET_USERINFO':
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialAppState);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useMutation(signIn, {
    onSuccess: (data) => {
      dispatch({
        type: 'SET_USERINFO',
        payload: { username: data.data.username, token: data.data.token },
      });
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `${data.data.username} successfully logged in!`, type: 'SUCCESS' },
      });
    },
  });

  const notificationStatus = state.notification.text;
  const loggedIn = state.userInfo.username != null;

  return (
    <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
      <div className='main'>
        {notificationStatus ? <Notification text={state.notification.text} /> : null}
        {loggedIn ? (
          <button onClick={() => logout()}>Log out</button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login.mutate({ username: username, password: password });
            }}
            className='form'
          >
            <label>Username</label>
            <input id='usernameInputLogin' onChange={(e) => setUsername(e.target.value)}></input>
            <label>Password</label>
            <input
              id='passwordInputLogin'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type='submit' className='login-button'>
              Login
            </button>
          </form>
        )}
        {loggedIn ? (
          <>
            <UserInfo />
            <BlogCreationForm />
          </>
        ) : (
          <p>Login unsuccessful,please check your credentials</p>
        )}
      </div>
    </AppContext.Provider>
  );

  async function logout() {
    dispatch({
      type: 'SET_USERINFO',
      payload: {
        username: null,
        token: null,
      },
    });
  }
}

export default App;
