/* eslint-disable react-hooks/exhaustive-deps */
import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { baseUrl, myDelete, myFetchAuth } from '../utils';
// import { useAuthCtx } from '../store/authContext';
// import { NavLink, useHistory } from 'react-router-dom';
import css from './css/Home.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { useAuthCtx } from '../store/authContext';
import toast from 'react-hot-toast';
function HomePage() {
  // const { id } = useParams();
  //   const history = useHistory();
  //   const { token } = useAuthCtx();
  //   if (!token) history.push('/login');
  const [posts, setPosts] = useState([]);
  const { token } = useAuthCtx();
  const getPosts = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/question`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  async function deleteQuestion(id) {
    const fetchResult = await myDelete(`${baseUrl}/question/${id}`, 'DELETE', token);
    if (fetchResult === true) {
      toast.success('Question was deleted');
      getPosts();
    }
  }

  return (
    <div className={css.center}>
      <h1 className='text-center'>Questions Page</h1>
      <div className={css.container}>
        {!Array.isArray(posts) ? (
          <h2 className={css['loading']}>Loading...</h2>
        ) : posts.length === 0 ? (
          <h2>No questions, Be the first one to add.</h2>
        ) : (
          posts.length > 0 && posts.map((qObj) => <Card key={qObj.id} {...qObj} onDelete={deleteQuestion} />)
        )}
      </div>
    </div>
  );
}

export default HomePage;
