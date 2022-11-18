import React from "react";

// Styles
import styled from "styled-components";

// TO DO
// [] CREATE ARRAY OF COLORS, AND THEIR NAMES;
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
  npPlayer: number;
}

const colors = [
  { name: "red", color: "#F91A1A" },
  { name: "yellow", color: "#FDBB5A" },
  { name: "blue", color: "#FDBB5A" },
];

export default function Stroop() {
  const nbPlayer = 6;
  const countDownSeconds = 3;

  return <div>index</div>;
}
