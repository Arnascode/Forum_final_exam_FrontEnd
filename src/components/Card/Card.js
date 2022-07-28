import { NavLink } from 'react-router-dom';
import css from './Card.module.css';

function Card(props) {
  return (
    <div className={css.card}>
      <div className={css.body}>
        <NavLink to={'/:id/answers'}>
          <button>
            <h2>Question Num. {props.id}</h2>Check answers
          </button>
        </NavLink>
        <h2 className={css.title}>{props.title}</h2>
        <h3 className={css.text}>{props.content}</h3>
        <p>{props.timestamp}</p>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Card;
