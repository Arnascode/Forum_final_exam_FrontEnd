import css from './Card.module.css';
function CardAnswer(props) {
  return (
    <div className={css.card}>
      <div className={css.body}>
        <h2>{props.id}</h2>
        <h3 className={css.title}>{props.answer}</h3>
        <p className={css.text}>
          <strong>Created at:</strong> {props.timestamp.split('.000Z')}
        </p>
        <p className={css.text}>
          <strong>Edited at:</strong> {props.edit.split('.000Z')}
        </p>
      </div>
      <div>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
}

export default CardAnswer;
