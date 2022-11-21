import React, { useState, useRef, useEffect, useCallback } from "react";

// Store
import { useStore } from "@/store";
import { useStoreGlasses } from "./store";

// Components
import Instructions from "./Instructions";
import Glass from "./Glass";
// import CountDown from "@/components/commons/CountDown";

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

const FillGlass = () => {
  // Store
  const { players } = useStore();
  const { setTargetWeight } = useStoreGlasses();

  // Config
  const countDownSeconds = 10;

  // Refs
  const countDownRef = useRef<any>();
  const instructionsRef = useRef<any>();

  useEffect(() => {
    playInstructions();
  }, []);

  const playInstructions = () => {
    // setInstructions("posez votre verre");
  };

  const getRandomValue = useCallback(({ min, max, interval }) => {
    return gsap.utils.random(min, max, interval);
  }, []);

  const launchGame = () => {
    const weight = getRandomValue({ min: 0.1, max: 2, interval: 0.1 });
    setTargetWeight(weight);
    // setLaunchCountDown(true);

    // Anim
    const tl = gsap.timeline();
    tl.to(instructionsRef.current, {
      opacity: 0,
      // onComplete: (): any => setInstructions(`poids: ${weight}g`),
    });

    tl.to(instructionsRef.current, {
      opacity: 1,
    });
  };

  const onGameEnd = useCallback(() => {}, []);

  return (
    <Container>
      {players.map((player, i) => (
        <Glass key={player.key} player={player} />
      ))}
      <Instructions />

      <StartButton onClick={launchGame}>Start</StartButton>
    </Container>
  );
};

export default FillGlass;
