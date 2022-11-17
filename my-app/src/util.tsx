import { ICard } from "./types";

export const getCardsFromStorage = () => {
  const cards = JSON.parse(localStorage.getItem("cards") || "[]");
  return cards;
};

export const setCardsToStorage = (cards: ICard[]) => {
  localStorage.setItem("cards", JSON.stringify(cards));
};
