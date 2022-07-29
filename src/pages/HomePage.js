/* eslint-disable react-hooks/exhaustive-deps */
import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { baseUrl, myDelete, myFetchAuth } from '../utils';
// import { useAuthCtx } from '../store/authContext';
// import { NavLink, useHistory } from 'react-router-dom';
import css from './css/Home.module.css';
import { useParams } from 'react-router-dom';
import { useAuthCtx } from '../store/authContext';

function HomePage() {
  const { id } = useParams();
  //   const history = useHistory();
  //   const { token } = useAuthCtx();
  //   if (!token) history.push('/login');
  const [posts, setPosts] = useState([]);
  const { token } = useAuthCtx();
  const getPosts = async () => {
    // const fetchResult = await myFetchAuth(`${baseUrl}/question`, token);
    const fetchResult = await myFetchAuth(`${baseUrl}/question`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };

  useEffect(() => {
    // if (token) getPosts();
    getPosts();
  }, []);

  const deletePosts = async () => {
    const fetchResult = await myDelete(`${baseUrl}/question/${id}`, 'DELETE', token);
    console.log('fetchResult ===', fetchResult);
  };

  return (
    <div className={css.center}>
      <h1 className='text-center'>Our Questions</h1>

      <div className={css.container}>
        {posts.length === 0 && <h2>Loading...</h2>}
        {posts.map((pObj) => (
          <Card key={pObj.id} {...pObj} />
        ))}
      </div>
      <button type='submit' className='btn'>
        Add
      </button>
    </div>
  );
}

export default HomePage;
