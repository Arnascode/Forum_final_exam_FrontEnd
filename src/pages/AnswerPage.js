/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { baseUrl, myDelete, myFetchAdd, myFetchAuthAnswer } from '../utils';
import { useAuthCtx } from '../store/authContext';
import { useHistory, useParams } from 'react-router-dom';
import css from './css/Answer.module.css';
import CardAnswer from '../components/CardAnswer/cardAnswer';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

function AnswerPage() {
  const initValues = {
    answer: '',
  };
  const title = localStorage.getItem('title');

  const [Title, setTitle] = useState({ title });

  useEffect(() => {
    setTitle({ title });
  }, [title]);

  const content = localStorage.getItem('content');

  const [Content, setContent] = useState({ content });

  useEffect(() => {
    setContent({ content });
  }, [content]);

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

  async function deleteQuestion(id) {
    const fetchResult = await myDelete(`${baseUrl}/answers/${id}`, 'DELETE', token);
    if (fetchResult === true) {
      toast.success('Answer was deleted');
      getPosts();
    }
  }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string().min(3, 'At least 3 characters').max(555).required(),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };

      console.log('valuesCopy ===', valuesCopy);
      const addResult = await myFetchAdd(`${baseUrl}/question/${id}/answers`, 'POST', token, values);
      console.log('addResult ===', addResult);
      if (addResult === true) {
        toast.success('Your answers were added successfully!');

        getPosts();
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
      <h2>Question: {content} </h2>
      <div className={css.container}>
        {posts.length === 0 && <h2>Loading...</h2>}
        {posts.map((pObj) => (
          <CardAnswer key={pObj.id} {...pObj} onDelete={deleteQuestion} />
        ))}
      </div>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className='form-group'>
          <label htmlFor='description'>Answer </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.answer}
            type='answer'
            className={rightClassesForInput('answer')}
            id='answer'
            name='answer'
          ></textarea>

          <div className='invalid-feedback'>{formik.errors.answer}</div>
          <button type='submit' className={css.but}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnswerPage;
