import css from './Card.module.css';

function Card(props) {
  return (
    <div className={css.card}>
      <div className={css.body}>
        <h2>{props.id}</h2>
        <h2 className={css.title}>{props.title}</h2>
        <h3 className={css.text}>{props.content}</h3>
        <p>{props.timestamp}</p>
      </div>
    </div>
  );
}

export default Card;
