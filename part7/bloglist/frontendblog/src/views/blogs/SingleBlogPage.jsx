import { useQuery } from 'react-query';
import { AppContext } from '../../App';
import { useParams } from 'react-router-dom';
import { getBlogDetailed } from '../../apiCalls';
import { useContext } from 'react';

const SingleBlogPage = () => {
  const { state } = useContext(AppContext);
  const { blogId } = useParams();
  const { data } = useQuery('blogDetailed', () =>
    getBlogDetailed({ token: state.userInfo.token, blogId: blogId }),
  );

  if (data === undefined) return <p>Blog data loading...</p>;

  return <p>{data.title}</p>;
};

export default SingleBlogPage;
