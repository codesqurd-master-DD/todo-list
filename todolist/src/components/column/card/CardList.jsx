import CardWrap from "./CardWrap";

function CardList(props) {
  const { cards, onDelete, onUpdate } = props;
  return (
    <ul>
      {cards.map((card) => (
        <CardWrap
          key={card.cardId}
          card={card}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default CardList;
