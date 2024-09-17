import React from "react";
import Card from "./Card";

interface CardData {
  id: string;
  cardNumber: string;
  name: string;
  imageUrl: string;
  cardDetails: string;
}

interface HandsProps {
  cards: CardData[];
  onDragStart: (card: CardData) => void;
  onDragEnd: () => void;
  onDrop: () => void;
}

const Hands: React.FC<HandsProps> = ({
  cards,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop();
  };

  return (
    <div className="hands" onDragOver={handleDragOver} onDrop={handleDrop}>
      {cards.map((card) => (
        <Card
          key={card.id}
          type="normal"
          name={card.name}
          draggable
          onDragStart={() => onDragStart(card)}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
};

export default Hands;
