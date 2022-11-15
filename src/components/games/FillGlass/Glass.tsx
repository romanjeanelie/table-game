import React, { useCallback, useEffect, useState, useRef } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
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

const Glass = ({ onGlassSet, weightTarget, isReady, isEnded }) => {
  const [currentWeight, setCurrentWeight] = useState<number>(0.1);
  const tempWeight: number = 0.1;

  // Refs
  const glassRef = useRef<any>();
  const liquidRef = useRef<any>();

  useEffect(() => {
    if (weightTarget === 0) return;
    console.log({ weightTarget });

    // updateLiquidLevel();
  }, [currentWeight, weightTarget]);

  const moreWeight = useCallback(() => {
    const newWeight: number = currentWeight + tempWeight;
    setCurrentWeight(Number(newWeight.toFixed(2)));
  }, [currentWeight]);
  const lessWeight = useCallback(() => {
    const newWeight: number = currentWeight - tempWeight;
    setCurrentWeight(Number(newWeight.toFixed(2)));
  }, [currentWeight]);

  const updateLiquidLevel = useCallback(() => {
    const levelRatio = currentWeight / weightTarget;
    console.log({ currentWeight, weightTarget, levelRatio });

    liquidRef.current.style.transform = `scaleY(${levelRatio})`;
  }, []);

  const handleGlassClick = () => {
    glassRef.current.style.borderColor = "red";
    onGlassSet();
  };
  return (
    <Container>
      <GlassEl ref={glassRef} onClick={handleGlassClick}>
        <Liquid ref={liquidRef} />
      </GlassEl>
      <Weight>{currentWeight}</Weight>
      <Controls>
        <button onClick={moreWeight}>+</button>
        <button onClick={lessWeight}>-</button>
      </Controls>
    </Container>
  );
};

export default Glass;
