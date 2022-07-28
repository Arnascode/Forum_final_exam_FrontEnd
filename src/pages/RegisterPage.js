import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetch } from '../utils';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterPage() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      fullName: Yup.string().min(3, 'At least 3 characters').max(15).required(),
      email: Yup.string().email('Please check your email').required(),
      password: Yup.string().min(4, 'At least 4 characters').max(10).required(),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      const registerResult = await myFetch(`${baseUrl}/register`, 'POST', valuesCopy);

      if (registerResult === 'user created') {
        ctx.login(registerResult.token, valuesCopy.email);
        history.replace('/login');
      }
    },
  });

  function matchPass() {
    const { password, repeatPassword } = initValues;
    if (password !== repeatPassword) {
      console.log('Passwords does not match');
    }
  }

  function rightClassesForInput(field) {
    let resultClasses = 'form-control';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }
    return resultClasses;
  }
  return (
    <div className='container'>
      <h1 className='text-center'>Register here</h1>
      <form onSubmit={formik.handleSubmit} onBlur={matchPass} className='jumbotron'>
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
          <label htmlFor='fullName'>Full Name</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            type='fullName'
            className={rightClassesForInput('fullName')}
            id='fullName'
            name='fullName'
          />
          <div className='invalid-feedback'>{formik.errors.fullName}</div>
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
        <div className='form-group'>
          <label htmlFor='repeatPassword'>Repeat Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            type='password'
            className={rightClassesForInput('repeatPassword')}
            id='repeatPassword'
            name='repeatPassword'
          />
          <div className='invalid-feedback'>{formik.errors.repeatPassword}</div>
        </div>
        <button type='submit' className='btn'>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
