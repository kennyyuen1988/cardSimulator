import React from "react";
import Card from "./Card";

interface CardData {
  id: string;
  cardNumber: string;
  name: string;
  imageUrl: string;
  cardDetails: string;
  x?: number;
  y?: number;
}

interface DesktopProps {
  leaderCard?: CardData;
  donCard?: {
    name: string;
    imageUrl: string;
  };
  cards: CardData[];
  onDragStart: (card: CardData) => void;
  onDragEnd: () => void;
  onDrop: (x: number, y: number) => void;
}

const Desktop: React.FC<DesktopProps> = ({
  leaderCard,
  donCard,
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
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onDrop(x, y);
  };

  return (
    <div className="desktop" onDragOver={handleDragOver} onDrop={handleDrop}>
      {cards.map((card) => (
        <Card
          key={card.id}
          type="normal"
          name={card.name}
          x={card.x}
          y={card.y}
          draggable
          onDragStart={() => onDragStart(card)}
          onDragEnd={onDragEnd}
        />
      ))}
      <div className="don-cards">
        {donCard && <Card type="don" name={donCard.name} />}
      </div>
      <div className="leader-card">
        {leaderCard && <Card type="leader" name={leaderCard.name} />}
      </div>
    </div>
  );
};

export default Desktop;
