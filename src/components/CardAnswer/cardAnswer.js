import css from './Card.module.css';
function CardAnswer(props) {
  return (
    <div className={css.card}>
      <div className={css.body}>
        <h2>{props.id}</h2>
        <h3 className={css.title}>{props.answer}</h3>
        <p className={css.text}>{props.timestamp}</p>
      </div>
    </div>
  );
}

export default CardAnswer;
