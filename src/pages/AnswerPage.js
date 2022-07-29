/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { baseUrl, myFetchAdd, myFetchAuthAnswer } from '../utils';
import { useAuthCtx } from '../store/authContext';
import { useHistory, useParams } from 'react-router-dom';
import css from './css/Home.module.css';
import CardAnswer from '../components/CardAnswer/cardAnswer';
import * as Yup from 'yup';
// import toast from 'react-hot-toast';

const initValues = {
  answer: '',
};

function AnswerPage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const getPosts = async () => {
    const fetchResult = await myFetchAuthAnswer(`${baseUrl}/question/${id}/answers`, token);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setPosts(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getPosts();
  }, []);
  
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string().min(3, 'At least 3 characters').max(15).required(),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };

      // console.log('values ===', values);
      console.log('valuesCopy ===', valuesCopy);
      const addResult = await myFetchAdd(`${baseUrl}/question/${id}/answers`, 'POST', token, values);
      console.log('addResult ===', addResult);
      if (addResult === true) {
        // toast.success('Logged in Successfully!');
        // console.log(toaster);
        history.replace('/');
      }
    },
  });
  function rightClassesForInput(field) {
    let resultClasses = 'form-control';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }
    return resultClasses;
  }

  return (
    <div className={css.center}>
      <h1 className='text-center'>Our Answers</h1>

      <div className={css.container}>
        {posts.length === 0 && <h2>Loading...</h2>}
        {posts.map((pObj) => (
          <CardAnswer key={pObj.id} {...pObj} />
        ))}
      </div>
      <form onSubmit={formik.handleSubmit} className={css.container}>
        <div className='form-group'>
          <label htmlFor='description'>answer</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.answer}
            type='answer'
            className={rightClassesForInput('answer')}
            id='answer'
            name='answer'
          />
          <div className='invalid-feedback'>{formik.errors.answer}</div>
        </div>
        <button type='submit' className='btn'>
          Add
        </button>
      </form>
    </div>
  );
}

export default AnswerPage;
