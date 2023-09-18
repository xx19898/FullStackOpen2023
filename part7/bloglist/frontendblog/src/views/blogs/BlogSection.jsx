import { useContext } from 'react';
import { AppContext } from '../../App';
import './Blogs.css';
import Blog from './Blog';
import { queryClient } from '../../main';
import { useMutation, useQuery } from 'react-query';
import { deleteBlog, getBlogs, like } from '../../apiCalls';
import { useMemo } from 'react';
import BlogCreationForm from './BlogCreationForm';

export const BlogSection = () => {
  const { state, dispatch } = useContext(AppContext);
  const token = state.userInfo.token;
  const { data } = useQuery('blogs', () => getBlogs({ token: token }));

  const blogsData = data === undefined || data === null ? undefined : data.data;

  const likeMutation = useMutation(like, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('blogs');
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Liked ${variables.blog}`, type: 'SUCCESS' },
      });
    },
    onError: (err) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { text: `${err}` } });
    },
  });

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('blogs');
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Deleted blog with id ${variables}`, type: 'SUCCESS' },
      });
    },
  });

  const blogs = useMemo(() => {
    if (blogsData === undefined || blogsData.length === 0) return [];
    else {
      return blogsData.sort(function (a, b) {
        return a.likes - b.likes;
      });
    }
  }, [blogsData]);

  return (
    <>
      {blogs.length === 0 ? (
        <p>No blogs here yet :/</p>
      ) : (
        <ul className='blogs-list'>
          {blogs.map((blog) => (
            <Blog blog={blog} key={blog._id} />
          ))}
        </ul>
      )}
      <BlogCreationForm />
    </>
  );
};
