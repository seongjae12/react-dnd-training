/** @jsxImportSource @emotion/react */

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { css } from "@emotion/react";
import CardConatiner from "./components/CardConatiner";
import { ICard } from "./types";
import { getCardsFromStorage, setCardsToStorage } from "./util";
import Button from "./components/Button";

const pageContainer = css`
  padding: 1rem;
`;

const formStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 5rem;
  padding: 1rem;
  label {
    width: 10rem;
    font-size: 1.2rem;
    color: #999;
    line-height: 5rem;
  }
  input {
    width: calc(100% - 20rem);
    padding: 0.6rem;
    margin: 1rem 0;
    border: 1px solid #ccc;
    font-size: 1.2rem;
    border-radius: 0.5rem;
  }
`;

function App() {
  const [cards, setCards] = useState<ICard[]>(getCardsFromStorage());
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    }
    setCards((prev) => [...prev, { id: Date.now(), text: inputText }]);
    setInputText("");
  };

  const handleClickDeleteButton = (e: any, card: ICard) => {
    if (window.confirm(`" ${card.text} "... 진짜 다했나요?`)) {
      setCards((prev) => prev.filter((prevCard) => prevCard.id !== card.id));
    }
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prev) => {
      const newArr = [...prev];
      const temp = prev[dragIndex];
      newArr[dragIndex] = newArr[hoverIndex];
      newArr[hoverIndex] = temp;
      return newArr;
    });
  }, []);

  useEffect(() => {
    setCardsToStorage(cards);
  }, [cards]);

  return (
    <main css={pageContainer}>
      <CardConatiner
        cards={cards}
        onClickButton={handleClickDeleteButton}
        moveCard={moveCard}
      />
      <form css={formStyle} onSubmit={handleSubmit}>
        <label htmlFor="card-input">할 일이 또 있다...</label>
        <input
          id="card-input"
          type="text"
          value={inputText}
          onChange={handleInputChange}
        />
        <Button label="추가!" size="lg" onClick={(e) => handleSubmit(e)} />
      </form>
    </main>
  );
}

export default App;
