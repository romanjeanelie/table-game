import React, { useCallback, useEffect, useState, useRef } from "react";

// Store
import { useStoreGlasses } from "./store";

// Styles
import styled from "styled-components";
import { PlayerProps } from "@/components/Player";
import { PlayerContainer } from "@/components/Player";

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -50px;
  width: 100px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GlassEl = styled.button`
  display: inherit;
  border: 1px solid lightblue;
  width: 40px;
  height: 80px;
  border-top: transparent;
  opacity: 0;
`;

const Liquid = styled.span`
  background-color: #cde3fb;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  transform: scaleY(50%);
`;

const Weight = styled.p``;
const Controls = styled.div`
  display: flex;
  width: 40px;
  margin-top: 7px;
  justify-content: space-between;

  transition: opacity 300ms, transform 300ms;

  button {
    &:active {
      opacity: 0.2;
      transform: scale(0.9);
    }
  }
`;

const Glass = ({ player }) => {
  // Store
  const { targetWeight } = useStoreGlasses();

  // Config
  const [currentWeight, setCurrentWeight] = useState<number>(0.1);
  const tempWeight: number = 0.1;

  // Refs
  const glassRef = useRef<any>();
  const liquidRef = useRef<any>();

  useEffect(() => {
    if (targetWeight === 0) return;
    console.log({ targetWeight });

    // updateLiquidLevel();
  }, [currentWeight, targetWeight]);

  const moreWeight = useCallback(() => {
    const newWeight: number = currentWeight + tempWeight;
    setCurrentWeight(Number(newWeight.toFixed(2)));
  }, [currentWeight]);

  const lessWeight = useCallback(() => {
    const newWeight: number = currentWeight - tempWeight;
    setCurrentWeight(Number(newWeight.toFixed(2)));
  }, [currentWeight]);

  const updateLiquidLevel = useCallback(() => {
    const levelRatio = currentWeight / targetWeight;
    console.log({ currentWeight, targetWeight, levelRatio });

    liquidRef.current.style.transform = `scaleY(${levelRatio})`;
  }, []);

  return (
    <PlayerContainer player={player}>
      <Container>
        <GlassEl ref={glassRef}>
          <Liquid ref={liquidRef} />
        </GlassEl>
        <Weight>{currentWeight}</Weight>
        <Controls>
          <button onClick={lessWeight}>-</button>
          <button onClick={moreWeight}>+</button>
        </Controls>
      </Container>
    </PlayerContainer>
  );
};

export default Glass;
