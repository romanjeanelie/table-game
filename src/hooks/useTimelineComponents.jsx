import React, { useRef, useEffect, useState } from "react";

const useTimelineComponents = (elements) => {
  const [index, setIndex] = useState(0);

  // Ref
  const timeoutRef = useRef();

  useEffect(() => {
    if (timeoutRef.current || !elements[index]) return;

    if (elements[index].duration) {
      timeoutRef.current = setTimeout(() => {
        setIndex(index + 1);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }, elements[index].duration * 1000);
    } else {
      if (elements[index].triggerComplete === true) {
        setIndex(index + 1);
      }
    }
  }, [index, elements]);

  return {
    currentId: elements[index].id,
    component: elements[index].component,
  };
};

export default useTimelineComponents;
