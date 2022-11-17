/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { ICard } from "../types";
import { useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import Button from "./Button";

const cardStyle = (isDragging: boolean) => css`
  padding: 1rem;
  font-size: 1.2rem;
  border: #ccc 1px solid;
  border-radius: 1rem;
  opacity: ${isDragging ? 0.5 : 1};
  background-color: ${isDragging ? "#ddd" : ""};
  display: flex;
  justify-content: space-between;
  cursor: move;
`;

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onClickButton: (e: any, card: ICard) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Card = ({ id, text, index, moveCard, onClickButton }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log("d", dragIndex, "h", hoverIndex);

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div ref={ref} css={cardStyle(isDragging)} data-handler-id={handlerId}>
      {text}
      <Button
        label="Done?"
        size="md"
        onClick={(e) => onClickButton(e, { id, text })}
      />
    </div>
  );
};

export default Card;
