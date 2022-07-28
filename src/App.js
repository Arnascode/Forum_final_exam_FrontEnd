import './App.css';
import Footer from './components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AddPage from './pages/AddPage';
import AnswerPage from './pages/AnswerPage';
// const id = 5;

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <ProtectedRoute path={'/add'}>
          <AddPage />
        </ProtectedRoute>
        <ProtectedRoute path={'/:id/answers'}>
          <AnswerPage />
        </ProtectedRoute>
        <Route exact path={'/'}>
          <HomePage />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
