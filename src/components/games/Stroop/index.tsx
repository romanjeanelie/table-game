import React, { useCallback, useState } from "react";

// Styles
import styled from "styled-components";

// Components
import Instructions from "./Instructions";
import PlayerColor from "./PlayerColor";

// TO DO
// [X] CREATE ARRAY OF COLORS, AND THEIR NAMES;
// [X] SELECT RANDOMLY BOTH A COLOR AND NAME;
// [X] GIVE A COLOR TO EACH PLAYER
// [X] IN FUNCTION OF THE NUMBER OF PLAYERS, ONLY SHOWCASE CERTAIN COLORS
// [] MAKE A FUNCTION THAT ENDS THE GAME WHEN A PLAYER HAS CLICKED ON HIS/HER BUTTON
// [] IF WON THE BORDER ON THE PLAYER IS DISPLAYED + INSTRUCTIONS DISPLAYS "YOU WIN"
// [] IF LOST THE BORDER ON THE PLAYER IS DISPLAYED + INSTRUCTIONS DISPLAYS "YOU LOSE"
// [] PERHAPS CREATE DIFFICULTY GAP : 1ST ONLY COLOR, 2ND COLOR AND NAME;

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

export interface ColorTypes {
  name: string;
  hex: string;
}

interface PropsTypes {
  nbPlayer?: number;
  countDownSeconds?: number;
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
  nbPlayer = 6,
  countDownSeconds = 3,
}: PropsTypes) {
  const [isReady, setIsReady] = useState(false);
  const [result, setResult] = useState("");
  const [randomColor, setRandomColor] = useState<ColorTypes>({
    name: "",
    hex: "",
  });
  const colorSelected = colors.slice(0, nbPlayer);

  // I'm gonna use the randomNumber function twice, and if i get both time on the same number it's a shame
  // So I implement a "notThisOne" prop, in order to avoid the case where we have twice the same number
  const getRandomNumber = (maxValue: number, notThisOne?: number) => {
    const randomNumber = Math.floor(Math.random() * maxValue);
    if (randomNumber !== notThisOne || notThisOne === undefined) {
      return randomNumber;
    } else {
      return getRandomNumber(maxValue, notThisOne);
    }
  };

  const getRandomColor = useCallback(() => {
    // get random idx for the name of the color (to trick the player)
    const nameRandomIdx = getRandomNumber(colorSelected.length);
    // get random idx for the hex value of the color
    let hexRandomIdx = getRandomNumber(colorSelected.length, nameRandomIdx);
    const randomColor = {
      name: colors[nameRandomIdx].name,
      hex: colors[hexRandomIdx].hex,
    };
    return randomColor;
  }, []);

  const launchGame = () => {
    setIsReady(true);
    setRandomColor(getRandomColor());
  };

  const finishGame = (playerInput: string, randomColor: string): void => {
    if (!isReady) return;
    playerInput === randomColor ? setResult("win") : setResult("loose");
    launchGame();
  };

  return (
    <Container>
      {colorSelected.map((color, idx) => (
        <PlayerColor
          color={color}
          randomColor={randomColor.hex}
          finishGame={finishGame}
        />
      ))}
      <Instructions isReady={isReady} randomColor={randomColor} />
      <StartButton onClick={launchGame}>Start</StartButton>
    </Container>
  );
}
