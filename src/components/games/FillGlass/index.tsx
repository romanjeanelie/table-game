import React, { useState, useRef, useEffect, useCallback } from "react";

// Components
import Glass from "./Glass";
import CountDown from "../../commons/CountDown";

// Styles
import styled from "styled-components";
import { gsap } from "gsap";

const Container = styled.div`
  background-color: #232222;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background-color: ${({ color }) => color};

  & > div:nth-child(1),
  & > div:nth-child(4),
  & > div:nth-child(7),
  & > div:nth-child(10) {
    opacity: 0;
  }
`;

const Instructions = styled.div`
  grid-column: 2 / span 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  padding: 6px 8px;
  border: 1px solid gray;

  &:active {
    background-color: darkgray;
  }
`;

interface PropsTypes {
  nbGlasses: number;
}

const FillGlass = () => {
  // Config
  const nbPlayers = 6;
  const countDownSeconds = 10;

  const [isReady, setIsReady] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [glassesOnTable, setGlassesOnTable] = useState(0);
  const [weightTarget, setWeightTarget] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [launchCountDown, setLaunchCountDown] = useState(false);

  // Refs
  const instructionsRef = useRef<any>();

  useEffect(() => {
    playInstructions();
  }, []);

  useEffect(() => {
    if (glassesOnTable === nbPlayers) setIsReady(true);
  }, [glassesOnTable]);

  useEffect(() => {
    if (isReady) launchGame();
  }, [isReady]);

  const playInstructions = () => {
    setInstructions("posez votre verre");
  };

  const getRandomValue = useCallback(({ min, max, interval }) => {
    return gsap.utils.random(min, max, interval);
  }, []);

  const launchGame = () => {
    const weight = getRandomValue({ min: 0.1, max: 2, interval: 0.1 });
    setWeightTarget(weight);
    setLaunchCountDown(true);

    // Anim
    const tl = gsap.timeline();
    tl.to(instructionsRef.current, {
      opacity: 0,
      onComplete: (): any => setInstructions(`poids: ${weight}g`),
    });

    tl.to(instructionsRef.current, {
      opacity: 1,
    });
  };

  const onGameEnd = useCallback(() => {
    setIsEnded(true);
  }, []);

  const onGlassSet = useCallback(() => {
    setGlassesOnTable((prev) => prev + 1);
  }, []);

  return (
    <Container>
      {Array.from({ length: 10 }).map((_, i) => (
        <Glass key={i} onGlassSet={onGlassSet} weightTarget={weightTarget} isReady={isReady} isEnded={isEnded} />
      ))}
      <Instructions ref={instructionsRef}>
        {instructions}
        <CountDown isLaunched={launchCountDown} onEnd={onGameEnd} />
      </Instructions>
      <StartButton onClick={() => setIsReady(true)}>Start</StartButton>
    </Container>
  );
};

export default FillGlass;
