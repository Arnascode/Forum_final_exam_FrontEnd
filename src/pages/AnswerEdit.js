/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { baseUrl, myPatch } from '../utils';
import { useAuthCtx } from '../store/authContext';
import { useHistory, useParams } from 'react-router-dom';
import css from './css/Home.module.css';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';


function AnswerEdit() {
  const answer = localStorage.getItem('answer');
  const initValues = {
    answer: answer,
  };

  const [updatedAnswer, setUpdatedAnswer] = useState(initValues);

  useEffect(() => {
    setUpdatedAnswer({ answer: localStorage.getItem('answer') });
  }, [answer]);

  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) {
    history.push('/login');
  }
  const { id } = useParams();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string().min(3, 'At least 3 characters').max(555).required(),
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
      <form onSubmit={formik.handleSubmit} className={css.container}>
        <div className='form-group'>
          <label htmlFor='answer'>Wanna Change?</label>
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
        </div>
        <button type='submit' className='btt'>
          Add
        </button>
      </form>
    </div>
  );
}

export default AnswerEdit;
