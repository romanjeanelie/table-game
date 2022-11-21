import React, { useRef, useEffect } from "react";

// Store
import { useStoreGlasses, instructions } from "./store";

// Styles
import styled from "styled-components";
import CountDown from "@/components/commons/CountDown";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Instructions = () => {
  // Store
  const { currentInstruction, setCurrentInstruction } = useStoreGlasses();

  // Refs
  const countDownPose = useRef<any>();

  useEffect(() => {
    if (!countDownPose.current) return;
    countDownPose.current.start();
  }, [currentInstruction]);

  const Instruction = () => {
    switch (currentInstruction) {
      case "poseVerre":
        return (
          <>
            <p>posez votre verre</p>
            <CountDown
              ref={countDownPose}
              startAt={4}
              //   hidden={true}
              onEnd={() => setCurrentInstruction(instructions[1])}
            />
          </>
        );
      case "rempliVerre":
        return (
          <>
            <p>Remplissez votre verre</p>
            <CountDown
              startAt={4}
              hidden={true}
              onEnd={() => setCurrentInstruction(instructions[2])}
            />
          </>
        );
    }
  };
  return (
    <Container>
      <Instruction />
    </Container>
  );
};

export default Instructions;
