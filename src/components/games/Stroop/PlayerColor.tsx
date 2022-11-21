import React, { useState } from "react";

// Styles
import styled from "styled-components";
import { ColorTypes } from ".";

interface ContainerProps {
  idx: number;
  playerId?: number;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: ${(props) => props.idx === props.playerId && "1px solid red"};

  // Positionning each player
  &:nth-of-type(1) {
    grid-row: 2;
    grid-column-start: 1;
  }
  &:nth-of-type(2) {
    grid-row: 1;
    grid-column-start: 2;
  }
  &:nth-of-type(3) {
    grid-row: 1;
    grid-column-start: 3;
  }
  &:nth-of-type(4) {
    grid-row: 3;
    grid-column-start: 2;
  }
  &:nth-of-type(5) {
    grid-row: 3;
    grid-column-start: 3;
  }
  &:nth-of-type(6) {
    grid-row: 2;
    grid-column-start: 4;
  }
`;

const Color = styled.p`
  background-color: ${({ color }) => color};
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-bottom: 12px;
`;

const Button = styled.button`
  padding: 2px 8px;
  border: 1px solid white;
  border-radius: 4px;
  transition: opacity 300ms, transform 300ms;

  &:active {
    opacity: 0.2;
    transform: scale(0.9);
  }
`;

interface PlayerColorProps {
  idx: number;
  color: ColorTypes;
  randomColor: string;
  playerId?: number;
  playGame: (
    playerInput: string,
    randomColor: string,
    playerId: number
  ) => void;
}

const PlayerColor = ({
  idx,
  color,
  randomColor,
  playerId,
  playGame,
}: PlayerColorProps) => {
  return (
    <Container idx={idx} playerId={playerId}>
      <Color color={color.hex} />
      <Button onClick={() => playGame(color.hex, randomColor, idx)}>
        It's me !
      </Button>
    </Container>
  );
};

export default PlayerColor;
