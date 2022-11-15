import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const CountDown = ({ start = 10, isLaunched = false, onEnd }) => {
  // State
  const [seconds, setSeconds] = useState(start);

  // Ref
  const secondsRef = useRef({
    current: start,
    prev: start,
    next: start,
  });

  useEffect(() => {
    if (isLaunched) {
      startCountDown();
    }
  }, [isLaunched]);

  const updateSeconds = () => {
    secondsRef.current.next = Math.floor(secondsRef.current.current);
    if (secondsRef.current.next !== secondsRef.current.prev) {
      setSeconds(secondsRef.current.next);
    }
    secondsRef.current.prev = secondsRef.current.next;
  };

  console.log("render");

  const startCountDown = () => {
    console.log("start count down");
    gsap.killTweensOf([secondsRef.current]);

    gsap.to(secondsRef.current, {
      current: 0,
      delay: 1,
      duration: start,
      ease: "linear",
      onUpdate: updateSeconds,
      onComplete: onEnd,
    });
  };

  return <div>{seconds}</div>;
};

export default CountDown;
