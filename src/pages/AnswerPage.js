/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../utils';
import { useAuthCtx } from '../store/authContext';
import { useHistory } from 'react-router-dom';
import css from './css/Home.module.css';
import CardAnswer from '../components/CardAnswer/cardAnswer';

function AnswerPage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/question/1/answers`, token);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getPosts();
  }, []);

  return (
    <div className={css.center}>
      <h1 className='text-center'>Our Questions</h1>

      <div className={css.container}>
        {posts.length === 0 && <h2>Loading...</h2>}
        {posts.map((pObj) => (
          <CardAnswer key={pObj.id} {...pObj} />
        ))}
      </div>
    </div>
  );
}

export default AnswerPage;
