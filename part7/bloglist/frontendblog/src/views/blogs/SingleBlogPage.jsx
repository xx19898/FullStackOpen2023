import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewComment, deleteBlog, getBlogDetailed, like } from '../../apiCalls';
import { useContext, useState } from 'react';
import './Blogs.css';

const SingleBlogPage = () => {
  const [comment, setComment] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const { blogId } = useParams();
  const { token, username } = state.userInfo;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useQuery('blogDetailed', () =>
    getBlogDetailed({ token: state.userInfo.token, blogId: blogId }),
  );

  const blog = data != undefined && data != null ? data.data : undefined;

  const likeMutation = useMutation(like, {
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries(['blogDetailed']);
      queryClient.invalidateQueries(['blogs']);
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
      queryClient.invalidateQueries(['blogDetailed']);
      queryClient.invalidateQueries(['blogs']);
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Deleted blog with id ${variables}`, type: 'SUCCESS' },
      });
      navigate('/');
    },
  });

  const addCommentMutation = useMutation(addNewComment, {
    onSuccess: (variables) => {
      queryClient.invalidateQueries('blogDetailed');

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Commented blog with id ${variables}`, type: 'SUCCESS' },
      });
    },
  });

  if (data === undefined || data === null) return <p>Blog data loading...</p>;

  return (
    <div>
      <p>
        <strong>{blog.title}</strong>
      </p>
      <p>Likes: {blog.likes}</p>
      <button onClick={() => likeMutation.mutate({ token: token, blog: blog.data })}>Like</button>
      <p>: {blog.likes}</p>
      <p>Author : {blog.author}</p>
      <p>
        Added by <strong>{blog.user.username}</strong>
      </p>
      {blog.user.username === username ? (
        <button onClick={() => deleteMutation.mutate({ token: token, blogId: blog._id })}>
          Delete
        </button>
      ) : null}
      {blog.comments === undefined || blog.comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <>
          <h2>Comments</h2>
          <ul className='comments-main'>
            {blog.comments.map((comment) => (
              <li className='comment' key={comment._id}>
                {comment.text}
              </li>
            ))}
          </ul>
        </>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCommentMutation.mutate({ token: token, comment: comment, blogId: blog._id });
          setComment('');
        }}
      >
        <label>Comment field</label>
        <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
        <button>Post comment</button>
      </form>
    </div>
  );
};

export default SingleBlogPage;
