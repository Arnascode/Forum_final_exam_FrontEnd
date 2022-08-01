import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myPatch } from '../utils';
import css from './css/Add.module.css';
import toast from 'react-hot-toast';

const tit = localStorage.getItem('title');
const cont = localStorage.getItem('content');
const initValues = {
  title: tit,
  content: cont,
};

function QuestEdit() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(3, 'At least 2 characters').max(55).required(),
      content: Yup.string().min(5, 'At least 5 characters').max(555).required(),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      console.log('valuesCopy ===', valuesCopy);
      const addResult = await myPatch(`${baseUrl}/question/${id}`, 'PATCH', token, values);
      console.log('addResult ===', addResult);
      if (addResult === true) {
        toast.success('Question changed successfully');
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
    <div className={css.card}>
      <h1 className={css.center}>Edit Your Question</h1>

      <form onSubmit={formik.handleSubmit} className={css.container}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type='title'
            className={rightClassesForInput('title')}
            id='title'
            name='title'
          />
          <div className='invalid-feedback'>{formik.errors.title}</div>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Content</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            type='content'
            className={rightClassesForInput('content')}
            id='content'
            name='content'
          />
          <div className='invalid-feedback'>{formik.errors.content}</div>
        </div>
        <button type='submit' className='btt'>
          Add
        </button>
      </form>
    </div>
  );
}

export default QuestEdit;
