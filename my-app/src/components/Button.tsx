/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

type buttonProps = {
  size?: string;
  color?: string;
};

const button = ({ size = "md", color = "primary" }: buttonProps) => css`
  width: ${size === "lg" ? "10rem" : size === "md" ? "6rem" : "3rem"};
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: white;
  background-color: ${color === "primary" ? "#75D1E5" : "#ED3A17"};
  cursor: pointer;
  :hover {
    background-color: ${color === "primary" ? "#61a8b8" : "#cb1805"};
  }
`;

type Props = {
  label: string;
  onClick: (e: any) => void;
  size?: "lg" | "md" | "sm";
  color?: "primary" | "secondary";
};

const Button = (props: Props) => {
  return (
    <div
      css={button({ size: props.size, color: props.color })}
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
};

export default Button;
