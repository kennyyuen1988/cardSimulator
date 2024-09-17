import React, { useState } from "react";

interface CardData {
  id: string;
  cardNumber: string;
  name: string;
  imageUrl: string;
  cardDetails: string;
  x?: number;
  y?: number;
  source?: "hand" | "desktop";
}

interface DeckProps {
  onImportData: (data: any) => void;
  onShuffle: () => void;
  onDraw: () => void;
  deckSize: number;
  onDrop: (position: "top" | "bottom") => void;
}

const Deck: React.FC<DeckProps> = ({
  onImportData,
  onShuffle,
  onDraw,
  deckSize,
  onDrop,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowOptions(true);
  };

  const handleOptionClick = (position: "top" | "bottom" | "cancel") => {
    if (position === "cancel") {
      setShowOptions(false);
    } else {
      onDrop(position);
      setShowOptions(false);
    }
  };

  return (
    <div className="deck">
      <div className="deck-actions">
        <button onClick={onShuffle}>Shuffle</button>
        <button onClick={onDraw}>Draw</button>
      </div>
      <div
        className="deck-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="deck-display">Deck: {deckSize} cards</div>
        {showOptions && (
          <div className="deck-options">
            <button onClick={() => handleOptionClick("top")}>Add to Top</button>
            <button onClick={() => handleOptionClick("bottom")}>
              Add to Bottom
            </button>
            <button onClick={() => handleOptionClick("cancel")}>Cancel</button>
          </div>
        )}
      </div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const content = event.target?.result;
              if (typeof content === "string") {
                onImportData(JSON.parse(content));
              }
            };
            reader.readAsText(file);
          }
        }}
      />
    </div>
  );
};

export default Deck;
