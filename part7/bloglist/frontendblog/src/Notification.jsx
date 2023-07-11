import { useContext, useEffect } from 'react';
import './App.css';
import { AppContext } from './App';

const Notification = () => {
  const { state, dispatch } = useContext(AppContext);
  const background = state.notification.type === 'SUCCESS' ? '#eec1cf' : '#53c6b6';
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'NONE', text: '' }});
    }, 5000);
    return () => clearTimeout(timeout);
  }, [state.notification.text]);
  return (
    <div className='notification-body' style={{ background: background }}>
      <p>{state.notification.text}</p>
    </div>
  );
};

export default Notification;
