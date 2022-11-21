import React, { useEffect, useRef } from "react";

// Config
import { introSteps } from "@/config";

// Store
import { useStore } from "@/store";

// Components
import CountDown from "@/components/commons/CountDown";

// Styles
import styled from "styled-components";
import { gsap } from "gsap";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  width: 100%;
  max-width: 500px;
`;

const Instructions = styled.div`
  position: absolute;
  width: 100%;
`;

const CountDownContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
`;

const SelectGame = ({ duration }) => {
  return <p>Select Game</p>;
};

const RegisterPlayers = ({ duration }) => {
  // Store
  const { game, players, setGameReady, resetGame } = useStore();
  const { isReady } = game;

  // Refs
  const countDownRef = useRef<any>();
  const introInstructionsRef = useRef();
  const noPlayersRef = useRef();

  useEffect(() => {
    animReset();
    if (countDownRef.current) countDownRef.current.start();
  }, []);

  useEffect(() => {
    if (isReady && players.length) animInstructionsOut();
    if (isReady && !players.length) animNoPlayersIn();
  }, [isReady]);

  const animReset = () => {
    gsap.set(noPlayersRef.current, {
      autoAlpha: 0,
    });
  };

  const animInstructionsOut = () => {
    gsap.to(introInstructionsRef.current, {
      autoAlpha: 0,
      delay: 0.3,
      duration: 0.5,
    });
  };
  const animInstructionsReset = () => {
    countDownRef.current.reset();

    gsap.to(noPlayersRef.current, {
      autoAlpha: 0,
    });
    gsap.to(introInstructionsRef.current, {
      autoAlpha: 1,
    });
  };

  const animNoPlayersIn = () => {
    console.log("no players");

    const tl = gsap.timeline();
    tl.to(introInstructionsRef.current, {
      autoAlpha: 0,
      delay: 0.3,
      duration: 0.5,
    });
    tl.to(noPlayersRef.current, {
      autoAlpha: 1,
    });

    tl.add(() => {
      animInstructionsReset();
      resetGame();
    }, "+=2");
    tl.add(() => {
      countDownRef.current.start();
    }, "+=1");
  };

  return (
    <>
      <Instructions ref={introInstructionsRef}>
        Poisitionnez vous devant un bouton
        <br />
        Maintenez le bouton enfoncé pour rentrer dans la partie
        <CountDownContainer>
          <CountDown ref={countDownRef} startAt={duration} onEnd={setGameReady} />
        </CountDownContainer>
      </Instructions>
      <Instructions ref={noPlayersRef}>Aucun joueur n'a été enregistré</Instructions>
    </>
  );
};

const Intro = () => {
  // Store
  const { game } = useStore();
  const { introStep } = game;

  const Steps = () => {
    switch (introStep) {
      case introSteps.selectGame.label:
        return <SelectGame duration={introSteps.selectGame.duration} />;
      case introSteps.registerPlayers.label:
        return <RegisterPlayers duration={introSteps.registerPlayers.duration} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Steps />
    </Container>
  );
};

export default Intro;
