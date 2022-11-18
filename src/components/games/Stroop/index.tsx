import React, { useState } from "react";

// Styles
import styled from "styled-components";

// Components
import Instructions from "./Instructions";
import PlayerColor from "./PlayerColor";

// TO DO
// [X] CREATE ARRAY OF COLORS, AND THEIR NAMES;
// [] SELECT RANDOMLY BOTH A COLOR AND NAME;
// [] PERHAPS CREATE DIFFICULTY GAP : 1ST ONLY COLOR, 2ND COLOR AND NAME;
// [] GIVE A COLOR TO EACH PLAYER
// [] IN FUNCTION OF THE NUMBER OF PLAYERS, ONLY SHOWCASE CERTAIN COLORS

const Container = styled.div`
  background-color: #232222;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);

  & > div:nth-child(1),
  & > div:nth-child(4),
  & > div:nth-child(7),
  & > div:nth-child(10) {
    opacity: 1;
  }
`;

const StartButton = styled.button`
  padding: 6px 8px;
  border: 1px solid gray;

  &:active {
    background-color: darkgray;
  }
`;

interface PropsTypes {
  nbPlayer: number;
  countDownSeconds: number;
}

const colors = [
  { name: "red", hex: "#F91A1A" },
  { name: "yellow", hex: "#FDBB5A" },
  { name: "blue", hex: "#63A0E8" },
  { name: "green", hex: "#86D09B" },
  { name: "orange", hex: "#E16B15" },
  { name: "violet", hex: "#C515E1" },
];

export default function Stroop({
  nbPlayer = 5,
  countDownSeconds = 3,
}: PropsTypes) {
  const [isReady, setIsReady] = useState(false);
  const colorSelected = colors.slice(0, nbPlayer);

  return (
    <Container>
      {colorSelected.map((color, idx) => (
        <PlayerColor color={color} />
      ))}
      <Instructions />
      <StartButton onClick={() => setIsReady(true)}>Start</StartButton>
    </Container>
  );
}
