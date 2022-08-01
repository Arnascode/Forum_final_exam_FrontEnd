/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { baseUrl, myPatch } from '../utils';
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
        <button type='submit' className='btt'>
          Add
        </button>
      </form>
    </div>
  );
}

export default AnswerEdit;
