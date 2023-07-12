import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

export const Navigation = () => {
  const [current, setCurrent] = useState('blogs');
  return (
    <div className='links'>
      <Link to='/blogs' onClick={() => setCurrent('blogs')}>
        {current === 'blogs' ? <strong>Blogs</strong> : 'Blogs'}
      </Link>
      <Link to='/users' onClick={() => setCurrent('users')}>
        {current === 'users' ? <strong>Users</strong> : 'Users'}
      </Link>
    </div>
  );
};
