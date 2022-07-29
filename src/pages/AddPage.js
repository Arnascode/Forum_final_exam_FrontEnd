import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetchAdd } from '../utils';
import css from './css/Add.module.css';
const initValues = {
  title: '',
  content: '',
};

function AddPage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(2, 'At least 2 characters').max(15).required(),
      content: Yup.string().min(5, 'At least 5 characters').max(225).required(),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };

      // console.log('values ===', values);
      console.log('valuesCopy ===', valuesCopy);
      const addResult = await myFetchAdd(`${baseUrl}/question`, 'POST', token, values);
      console.log('addResult ===', addResult);
      if (addResult === true) {
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
      <h1 className={css.center}>Add Your Question</h1>

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
        <button type='submit' className='btn'>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPage;
