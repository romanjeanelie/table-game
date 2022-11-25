import React from "react";

// Styles
import styled from "styled-components";
import { ColorTypes, ResultTypes } from ".";

const Container = styled.div`
  grid-column: 2 / span 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    margin-bottom: 24px;
  }
`;

interface PropsTypes {
  isReady: boolean;
  result?: ResultTypes;
  randomColor: ColorTypes;
  setIsReady: (e: boolean) => void;
}

export default function Instructions({
  result,
  isReady,
  setIsReady,
  randomColor,
}: PropsTypes) {
  return (
    <Container>
      {!isReady ? (
        <>
          <h1>Click on your color</h1>
          <p>⚠️ Only the color of the word matters, not the word itself.</p>
        </>
      ) : !result ? (
        <>
          <h1 style={{ color: `${randomColor.hex}` }}>{randomColor.name}</h1>
          <CountDown
            startAt={3}
            isLaunched={isReady}
            onEnd={() => setIsReady(false)}
          />
        </>
      ) : (
        <>
          <h1 style={{ color: `${randomColor.hex}` }}>{randomColor.name}</h1>
          {result.message}
        </>
      )}
    </Container>
  );
}
