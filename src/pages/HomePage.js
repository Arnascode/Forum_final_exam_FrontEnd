/* eslint-disable react-hooks/exhaustive-deps */
import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { baseUrl, myDelete, myFetchAuth } from '../utils';
import css from './css/Home.module.css';
import { useAuthCtx } from '../store/authContext';
import toast from 'react-hot-toast';
import Button from '../components/UI/Button/Button';
import Icon from '../components/UI/Icon/Icon';

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
  const getPostsAsc = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/questionasc`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };
  const getPostsDesc = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/questiondesc`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };
  const getAnswersAsc = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/answerasc`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };
  const getAnswersDesc = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}/answerdesc`);
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
      <h1 className='text-center'>Our Questions</h1>
      <div className='desAsc'>
        <div className='time'>
          <h3>By time</h3>
          <Button onClick={getPostsAsc}>
            <Icon icon='fa fa-sort-amount-asc' />
          </Button>
          <Button onClick={getPostsDesc}>
            <Icon icon='fa fa-sort-amount-desc' />
          </Button>
        </div>
        <div className='answerDEA'>
          <h3>Only with Answers</h3>
          <Button onClick={getAnswersAsc}>
            <Icon icon='fa fa-sort-amount-asc' />
          </Button>
          <Button onClick={getAnswersDesc}>
            <Icon icon='fa fa-sort-amount-desc' />
          </Button>
        </div>
      </div>
      <div className={css.container}>
        {!Array.isArray(posts) ? (
          <h2>Loading...</h2>
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
