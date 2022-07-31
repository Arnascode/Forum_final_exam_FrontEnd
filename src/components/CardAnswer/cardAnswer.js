import css from './Card.module.css';
import Button from '../UI/Button/Button';
import { useState } from 'react';
import Icon from '../UI/Icon/Icon';
import { NavLink } from 'react-router-dom';

function CardAnswer(props) {
  const [counterValue, setCounterValue] = useState(0);

  function handleCounterInc() {
    setCounterValue((prevState) => prevState + 1);
  }

  function handleCounterDec() {
    setCounterValue((prevState) => prevState - 1);
  }
  return (
    <div className={css.card}>
      <div className={css.body}>
        <h2>{props.id}</h2>
        <h3 className={css.title}>{props.answer}</h3>

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
      </div>
      <div>
        <Button button secondary onClick={() => props.onDelete(props.id)}>
          Delete
        </Button>
        <NavLink to={`/answers/${props.id}`}>
          <Button button primary>
            Edit
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default CardAnswer;
