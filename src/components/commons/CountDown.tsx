import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";

// Styles
import styled from "styled-components";
import { gsap } from "gsap";
import { PlayerContainer } from "../Player";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background-color: white;
  transform-origin: center left;
`;

interface CountDownProps {
  startAt?: number;
  onEnd?: () => void;
  hidden?: boolean;
}

const CountDown = ({ startAt = 10, onEnd, hidden }: CountDownProps, ref) => {
  // State
  const [seconds, setSeconds] = useState(startAt);

  // Ref
  const progressBarRef = useRef();
  const secondsRef = useRef({
    current: startAt,
    prev: startAt,
    next: startAt,
  });

  useImperativeHandle(ref, () => ({
    start: () => {
      gsap.killTweensOf([secondsRef.current]);

      const tl = gsap.timeline({
        onUpdate: updateSeconds,
        onComplete: onEnd,
        defaults: {
          duration: startAt,
          ease: "linear",
        },
      });

      tl.to(secondsRef.current, {
        delay: 1,
        current: 0,
      });
      tl.to(
        progressBarRef.current,
        {
          scaleX: 0,
        },
        "<"
      );
    },
    reset: () => {
      gsap.set(secondsRef.current, {
        current: startAt,
      });
      gsap.set(progressBarRef.current, {
        scaleX: 1,
      });

      setSeconds(startAt);
    },
  }));

  const updateSeconds = () => {
    secondsRef.current.next = Math.ceil(secondsRef.current.current);
    if (secondsRef.current.next !== secondsRef.current.prev) {
      setSeconds(secondsRef.current.next);
    }
    secondsRef.current.prev = secondsRef.current.next;
  };

  return (
    <Container hidden={hidden}>
      {seconds}
      <ProgressBar ref={progressBarRef} />
    </Container>
  );
};

export default forwardRef(CountDown);
