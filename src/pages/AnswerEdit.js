/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { baseUrl, myDelete, myFetchAdd, myFetchAuthAnswer, myPatch } from '../utils';
import { useAuthCtx } from '../store/authContext';
import { useHistory, useParams } from 'react-router-dom';
import css from './css/Home.module.css';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
const answ = localStorage.getItem('answer');
const initValues = {
  answer: answ,
};

function AnswerEdit() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');

  const { id } = useParams();

  //   const getPosts = async () => {
  //     const fetchResult = await myFetchAuthAnswer(`${baseUrl}/question/${id}/answers`, token);
  //     console.log('fetchResult ===', fetchResult);
  //     if (Array.isArray(fetchResult)) {
  //       setPosts(fetchResult);
  //     }
  //   };

  //   useEffect(() => {
  //     if (token) getPosts();
  //   }, []);

  //   async function deleteQuestion(id) {
  //     const fetchResult = await myDelete(`${baseUrl}/answers/${id}`, 'DELETE', token);
  //     if (fetchResult === true) {
  //       toast.success('Question was deleted');
  //       getPosts();
  //     }
  //   }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string().min(3, 'At least 3 characters').max(225).required(),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };

      // console.log('values ===', values);
      console.log('valuesCopy ===', valuesCopy);
      const addResult = await myPatch(`${baseUrl}/answers/${id}`, 'PATCH', token, values);
      console.log('addResult ===', addResult);
      if (addResult === true) {
        toast.success('Answer change is Successfully!', { duration: 1000 });
        history.goBack();

        // Peržiūrėti klausimų sąrašą su gamybė rikiuoti pagal klausimo datą ir/arba atsakymų skaičių (didėjimo arba mažėjimo tvarka)
        // ar reikia is backo left joiN? butina backo
        // Filtruoti atsakytus arba neatsakytus klausimus
        // su length jauciu ar reikia is backo pasidaryt ? AGREGATION select count
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
      <h1 className='text-center'>Edit Answers</h1>

      {/* <div className={css.container}>
        {posts.length === 0 && <h2>Loading...</h2>}
        {posts.map((pObj) => (
          <CardAnswer key={pObj.id} {...pObj} onDelete={deleteQuestion} />
        ))}
      </div> */}
      <form onSubmit={formik.handleSubmit} className={css.container}>
        <div className='form-group'>
          <label htmlFor='description'>Wanna Change?</label>
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

export default AnswerEdit;
