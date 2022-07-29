import { NavLink } from 'react-router-dom';
import css from './Card.module.css';

function Card(props) {
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
        <p>Created at: {props.timestamp}</p>
        <p>Edited at: {props.edit}</p>
        <div>
          <button>Delete</button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
