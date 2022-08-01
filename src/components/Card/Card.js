import { NavLink } from 'react-router-dom';
// import ProtectedRoute from '../ProtectedRoute';
import css from './Card.module.css';
import { useState } from 'react';
import Button from '../UI/Button/Button';
import Icon from '../UI/Icon/Icon';

function Card(props) {
  const [counterValue, setCounterValue] = useState(0);

  function handleCounterInc() {
    setCounterValue((prevState) => prevState + 1);
  }

  function handleCounterDec() {
    setCounterValue((prevState) => prevState - 1);
  }
  const handle = () => {
    localStorage.setItem('title', props.title);
    localStorage.setItem('content', props.content);
  };
  console.log(handle);
  return (
    <div className={css.card}>
      <div className={css.body}>
        <NavLink to={`/${props.id}/answers`}>
          <button>
            <h2>Question Num. {props.id}</h2>Check answers
          </button>
        </NavLink>
        <h2 className={css.title}>{props.title}</h2>
        <h3 className={css.text}>{props.content}</h3>
        <div className={css.likedis}>
          <button className={css.like} onClick={handleCounterInc}>
            <Icon icon='fa fa-thumbs-up' />
          </button>
          <p className={css['counter-value']}>{counterValue}</p>
          <button className={css.dislike} onClick={handleCounterDec}>
            <Icon icon='fa fa-thumbs-down' />
          </button>
        </div>
        <p className={css.text}>
          <strong>Created at:</strong> {props.timestamp.split('T').join(' Time:').split('.000Z')}
        </p>
        <p className={css.text}>
          <strong>Edited at:</strong> {props.edit.split('T').join(' Time:').split('.000Z')}
        </p>
        <div>
          <Button button secondary onClick={() => props.onDelete(props.id)}>
            Delete
          </Button>
          <NavLink to={`/question/${props.id}`}>
            {/* <Button button primary onClick={() => props.onPatch(props.id)}> */}
            <Button onClick={handle}>Edit</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Card;
