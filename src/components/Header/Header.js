import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header(props) {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();

  return (
    <header className={css.header}>
      <nav>
        <div>
          <div>
            <div>
              <NavLink className='nav-link' exact to={'/'}>
                <img className={css.img} src='./img/logo.png' alt='' srcset='' />
              </NavLink>
              {/* <div>{isUserLoggedIn && <h2 className={css['email']}> Hello {userEmail}</h2>}</div> */}
              {isUserLoggedIn && (
                <>
                  <NavLink className={css['nav-link']} exact to={'/'}>
                    Home
                  </NavLink>
                  <NavLink className={css['nav-link']} to={'/add'}>
                    Add Question
                  </NavLink>
                  <NavLink onClick={logout} className={css['nav-link']} to={'/login'}>
                    Logout
                  </NavLink>
                </>
              )}
              {!isUserLoggedIn && (
                <>
                  <NavLink className={css['nav-link']} to={'/login'}>
                    Login
                  </NavLink>
                  <NavLink className={css['nav-link']} to={'/register'}>
                    Register
                  </NavLink>
                  <NavLink className={css['nav-link']} to={'/add'}>
                    Add Question
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
