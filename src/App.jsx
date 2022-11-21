import React, { useEffect } from "react";

// Store
import { useStore } from "@/store";

// Config
import { debug } from "@/config";

// Components
import Game from "./components/Game";
import Player from "@/components/Player";

// Styles
import styled from "styled-components";

const Container = styled.div`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  position: relative;
  background-color: #232222;
`;

function App() {
  // Store
  const { players, addPlayer, removePlayer } = useStore();

  // Register all players
  useEffect(() => {
    if (debug) players.map((player) => addPlayer(player.key));
  }, []);

  return (
    <Container>
      {players.map((el) => (
        <Player key={el.key} player={el} />
      ))}
      <Game />
    </Container>
  );
}

export default App;
