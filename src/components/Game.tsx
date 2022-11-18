import React from "react";
import FillGlass from "./games/FillGlass";
import Stroop from "./games/Stroop";

import styled from "styled-components";

const Container = styled.div`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
`;

const Game = () => {
  return (
    <Container>
      <Stroop />
      <FillGlass />
    </Container>
  );
};

export default Game;
