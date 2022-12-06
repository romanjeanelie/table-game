import React, { useCallback } from "react";

// Store
import { useStore } from "@/store";
import { useStoreGlasses } from "./store";

// Components
import Gameplay from "./Gameplay";
import Glass from "./Glass";

// Styles
import styled from "styled-components";
import { gsap } from "gsap";

const Container = styled.div`
  background-color: #232222;
  width: 100%;
  height: 100%;
`;

const StartButton = styled.button`
  padding: 6px 8px;
  border: 1px solid gray;
  position: absolute;
  bottom: 0;
  left: 0;

  &:active {
    background-color: darkgray;
  }
`;

const getRandomValue = ({ min, max, interval }) => {
  return gsap.utils.random(min, max, interval);
};

const FillGlass = () => {
  // Store
  const { players, getRegisteredPlayers } = useStore();
  const { setTargetWeight } = useStoreGlasses();

  const launchGame = () => {
    const weight = getRandomValue({ min: 0.1, max: 2, interval: 0.1 });
    setTargetWeight(weight);
  };

  return (
    <Container>
      {players.map((player, i) => (
        <Glass key={player.key} player={player} />
      ))}

      <Gameplay />

      <StartButton onClick={launchGame}>Start</StartButton>
    </Container>
  );
};

export default FillGlass;
