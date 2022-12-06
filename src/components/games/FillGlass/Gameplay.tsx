import { useState } from "react";

// Hook
import useTimelineComponents from "@/hooks/useTimelineComponents";

// Styles
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Gameplay = () => {
  const [glassesFilled, setGlassesFilled] = useState(false);

  const { currentId, component } = useTimelineComponents([
    {
      id: 0,
      component: "Posez votre verre",
      duration: 2,
    },
    {
      id: 1,
      component: "Remplisser votre verre",
      triggerComplete: glassesFilled,
    },
    {
      id: 2,
      component: "Résultats",
    },
  ]);

  return (
    <Container>
      {component}
      {currentId === 1 && (
        <button onClick={() => setGlassesFilled(true)}>isFilled</button>
      )}
    </Container>
  );
};

export default Gameplay;
