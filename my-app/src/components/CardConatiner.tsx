/** @jsxImportSource @emotion/react */

import React from "react";
import { useCallback, useState } from "react";
import { css } from "@emotion/react";
import { ICard } from "../types";
import Card from "./Card";

type Props = {
  cards: ICard[];
  onClickButton: (e: any, card: ICard) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

const container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardConatiner = ({ cards, moveCard, onClickButton }: Props) => {
  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          onClickButton={onClickButton}
        />
      );
    },
    [moveCard]
  );

  return (
    <div css={container}>
      {cards.map((card, index) => renderCard(card, index))}
    </div>
  );
};

export default CardConatiner;
