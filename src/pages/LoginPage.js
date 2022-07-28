import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetch } from '../utils';

const initValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Check your email').required(),
      password: Yup.string().min(4, 'At least 4 characters').max(10).required(),
    }),
    onSubmit: async (values) => {
      const fetchResult = await myFetch(`${baseUrl}/login`, 'POST', values);
      console.log(fetchResult);
      if (fetchResult.success === true) {
        ctx.login(fetchResult.token, values.email);
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
    <div className='container'>
      <h1 className='text-center'>Login Here</h1>
      <form onSubmit={formik.handleSubmit} className='jumbotron'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            className={rightClassesForInput('email')}
            id='email'
            name='email'
          />
          <div className='invalid-feedback'>{formik.errors.email}</div>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            className={rightClassesForInput('password')}
            id='password'
            name='password'
          />
          <div className='invalid-feedback'>{formik.errors.password}</div>
        </div>
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
