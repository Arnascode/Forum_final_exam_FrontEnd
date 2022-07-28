/* eslint-disable react-hooks/exhaustive-deps */
import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../utils';
// import { useAuthCtx } from '../store/authContext';
// import { NavLink, useHistory } from 'react-router-dom';
import css from './css/Home.module.css';

function HomePage() {
  //   const history = useHistory();
  //   const { token } = useAuthCtx();
  //   if (!token) history.push('/login');
  const [posts, setPosts] = useState([]);

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

  return (
    <div className={css.center}>
      <h1 className='text-center'>Our Questions</h1>

      <div className={css.container}>
        {posts.length === 0 && <h2>Loading...</h2>}
        {posts.map((pObj) => (
          <Card key={pObj.id} {...pObj} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
