import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useMutation } from 'react-query';
import { signIn } from '../apiCalls';

export const LoginPage = () => {
  const { dispatch } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useMutation(signIn, {
    onSuccess: (data) => {
      console.log('LOGIN SUCCESS CALLBACK')
      const loginData = data.data;
      dispatch({
        type: 'SET_USERINFO',
        payload: { username: loginData.username, token: loginData.token },
      });
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `${loginData.username} successfully logged in!`, type: 'SUCCESS' },
      });
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: error.message, type: 'ERROR' },
      });
    },
  });

  return (
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
  );
};
