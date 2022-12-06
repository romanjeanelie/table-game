import React, { useRef, useCallback } from "react";

// Config
import { sizesPlayer } from "@/config";
// Store
import { useStore } from "@/store";

// Styles
import styled from "styled-components";
import { gsap } from "gsap";
import { useEffect } from "react";

export interface PlayerProps {
  readonly positionX: number;
  readonly positionY: number;
  readonly direction: string;
}

export const Container = styled.div<PlayerProps>`
  position: absolute;
  left: ${({ positionX }) => positionX + "%"};
  top: ${({ positionY }) => positionY + "%"};
  width: ${sizesPlayer.width}px;
  height: ${sizesPlayer.height}px;
  transform: ${({ direction }) => `translate3d(-50%, -50%, 0) ${direction}`};
  border-radius: 50%;
`;

const Marker = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #c0783c;
  transform-origin: center;
  transform: scale(0);
`;

const Controls = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  transform: translateY(100%);
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  border-bottom: 1px solid lightgray;
  font-size: 14px;
`;

export const PlayerContainer = ({ player, children }) => {
  const getDirection = () => {
    switch (player.key) {
      case 1:
      case 2:
        return "rotate(180deg)";
      case 3:
        return "rotate(-90deg)";
      case 6:
        return "rotate(90deg)";
      default:
        return "";
    }
  };
  return (
    <Container
      direction={getDirection()}
      positionX={player.position.x}
      positionY={player.position.y}
    >
      {children}
    </Container>
  );
};

const Player = ({ player }) => {
  // Config
  const durationAddingPlayer = 0.1;

  // Store
  const { addPlayer, removePlayer } = useStore();

  //Refs
  const markerRef = useRef();
  const tlAddPlayer = useRef(null);

  useEffect(() => {
    if (player.isRegistered) {
      console.log(`player ${player.key} added`);
      gsap.to(markerRef.current, {
        backgroundColor: "#8b5f20",
        scale: 1,
      });
    }
  }, [player]);

  // Animations
  const handleAdd = useCallback(() => {
    gsap.killTweensOf([markerRef.current]);

    tlAddPlayer.current = gsap.timeline();

    tlAddPlayer.current.to(markerRef.current, {
      duration: durationAddingPlayer,
      scale: 1,
      ease: "linear",
    });

    tlAddPlayer.current.add(() => addPlayer(player.key));
  }, []);

  const handleRemove = useCallback(() => {
    if (!player) return;

    console.log(`player ${player.key} removed`);
    removePlayer(player.key);

    gsap.killTweensOf([markerRef.current]);
    gsap.to(markerRef.current, {
      duration: 0.2,
      scale: 0,
      backgroundColor: "#c0783c",
      ease: "linear",
    });
  }, [player]);

  const onMouseUp = useCallback(() => {
    if (player) return;

    gsap.killTweensOf([markerRef.current]);
    tlAddPlayer.current.kill();

    gsap.to(markerRef.current, {
      duration: 0.7,
      scale: 0,
      ease: "linear",
    });
  }, [player]);

  return (
    <PlayerContainer player={player}>
      <Marker ref={markerRef} />
      <Controls>
        <Button onMouseDown={handleAdd} onMouseUp={onMouseUp}>
          Add
        </Button>
        <Button onClick={handleRemove}>Remove</Button>
      </Controls>
    </PlayerContainer>
  );
};

export default Player;
