import React from "react";

interface CardProps {
  type: "normal" | "don" | "leader";
  rotated?: boolean;
  name?: string;
  x?: number;
  y?: number;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const Card: React.FC<CardProps> = ({
  type,
  rotated,
  name,
  x,
  y,
  draggable,
  onDragStart,
  onDragEnd,
}) => {
  const style: React.CSSProperties = {
    position: x !== undefined && y !== undefined ? "absolute" : "static",
    left: x,
    top: y,
  };

  return (
    <div
      className={`card ${rotated ? "rotated" : ""}`}
      style={style}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {type === "normal" && (name || "Card")}
      {type === "don" && (name || "Don")}
      {type === "leader" && (name || "Leader Card")}
    </div>
  );
};

export default Card;
