import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoggedUserSection } from './LoggedUserInfo';
import { Users } from './users/users';
import { BlogSection } from './blogs/BlogSection';
import { Navigation } from './Navigation';
import User from './users/User';
import SingleBlogPage from './blogs/SingleBlogPage';

export const AppBody = () => {
  return (
    <>
      <LoggedUserSection />
      <Router basename='/'>
        <Navigation />
        <Routes>
          <Route path='/' element={<BlogSection />} />
          <Route path='/users/:userId' element={<User />} />
          <Route path='/users' element={<Users />} />
          <Route path='/blogs/:blogId' element={<SingleBlogPage />} />
          <Route path='/blogs' element={<BlogSection />} />
        </Routes>
      </Router>
    </>
  );
};
