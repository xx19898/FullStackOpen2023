import React from 'react';
import './App.css';
import Notification from './Notification';
import { useReducer } from 'react';
import { LoginPage } from './views/LoginPage';
import { AppBody } from './views/AppBody';

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

  const notificationStatus = state.notification.text;
  const loggedIn = state.userInfo.username != null;

  return (
    <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
      <div className='main'>
        {notificationStatus ? <Notification text={state.notification.text} /> : null}
        {loggedIn ? <AppBody /> : <LoginPage />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
