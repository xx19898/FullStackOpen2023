import './App.css';
import React from 'react';

const Notification = ({ text, context }) => {
  const background = context === 'success' ? '#eec1cf' : '#53c6b6';
  return (
    <div className='notification-body' style={{ background: background }}>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
