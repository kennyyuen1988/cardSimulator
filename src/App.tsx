import React, { useState, useEffect } from "react";
import "./App.css";
import Desktop from "./components/Desktop";
import Deck from "./components/Deck";
import Hands from "./components/Hands";

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

interface GameData {
  leaderCard: CardData;
  donCard: {
    name: string;
    imageUrl: string;
  };
  cards: CardData[];
}

const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [hand, setHand] = useState<CardData[]>([]);
  const [desktopCards, setDesktopCards] = useState<CardData[]>([]);
  const [draggingCard, setDraggingCard] = useState<CardData | null>(null);

  const shuffleDeck = (): CardData[] => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    return shuffled;
  };

  useEffect(() => {
    if (gameData) {
      const shuffledDeck = [...gameData.cards].sort(() => Math.random() - 0.5);
      setDeck(shuffledDeck);
      setHand([]);
    }
  }, [gameData]);

  const handleImportData = (data: GameData) => {
    setGameData(data);
    console.log("Imported data:", data);
    // 直接設置牌組
    const shuffledDeck = [...data.cards].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setHand([]);
  };

  const handleDragStart = (card: CardData, source: "hand" | "desktop") => {
    setDraggingCard({ ...card, source });
  };

  const handleDragEnd = () => {
    // 不在這裡設置 draggingCard 為 null，讓 handleDropOnDeck 來處理
  };

  const handleDropOnDesktop = (x: number, y: number) => {
    if (draggingCard) {
      const updatedCard = { ...draggingCard, x, y };
      if (draggingCard.source === "hand") {
        setDesktopCards([...desktopCards, updatedCard]);
        setHand(hand.filter((card) => card.id !== draggingCard.id));
      } else {
        setDesktopCards(
          desktopCards.map((card) =>
            card.id === draggingCard.id ? updatedCard : card
          )
        );
        setDraggingCard(null); // 清除正在拖動的卡片
      }
    }
  };

  const handleDropOnDeck = (position: "top" | "bottom") => {
    if (draggingCard) {
      const newDeck =
        position === "top" ? [draggingCard, ...deck] : [...deck, draggingCard];

      console.log(
        `Adding card to ${position} of deck. New deck size: ${newDeck.length}`
      );
      setDeck(newDeck);

      // 從原位置移除卡片
      if (draggingCard.source === "hand") {
        console.log(
          `Removing card from hand. New hand size: ${hand.length - 1}`
        );
        setHand(hand.filter((card) => card.id !== draggingCard.id));
      } else if (draggingCard.source === "desktop") {
        console.log(
          `Removing card from desktop. New desktop size: ${
            desktopCards.length - 1
          }`
        );
        setDesktopCards(
          desktopCards.filter((card) => card.id !== draggingCard.id)
        );
      }

      setDraggingCard(null);
    }
  };

  const drawCard = () => {
    if (deck.length > 0) {
      const drawnCard = deck[0];
      setHand([...hand, drawnCard]);
      setDeck(deck.slice(1));
    }
  };

  const handleDropOnHands = () => {
    if (draggingCard && draggingCard.source === "desktop") {
      // 將卡片添加到手牌
      setHand([...hand, draggingCard]);

      // 從桌面移除卡片
      setDesktopCards(
        desktopCards.filter((card) => card.id !== draggingCard.id)
      );

      // 清除正在拖動的卡片
      setDraggingCard(null);

      console.log(
        `Card moved from desktop to hand. New hand size: ${hand.length + 1}`
      );
      console.log(`New desktop size: ${desktopCards.length - 1}`);
    }
  };

  return (
    <div className="simulator">
      <div className="game-area">
        <Desktop
          leaderCard={gameData?.leaderCard}
          donCard={gameData?.donCard}
          cards={desktopCards}
          onDragStart={(card) => handleDragStart(card, "desktop")}
          onDragEnd={handleDragEnd}
          onDrop={handleDropOnDesktop}
        />
        <Deck
          onImportData={handleImportData}
          onShuffle={shuffleDeck}
          onDraw={drawCard}
          deckSize={deck.length}
          onDrop={handleDropOnDeck}
        />
      </div>
      <Hands
        cards={hand}
        onDragStart={(card) => handleDragStart(card, "hand")}
        onDragEnd={handleDragEnd}
        onDrop={handleDropOnHands}
      />
    </div>
  );
};

export default App;
