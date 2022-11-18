import React, { useState } from "react";

// Styles
import styled from "styled-components";

const Container = styled.div`
  grid-column: 2 / span 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    margin-bottom: 24px;
  }
`;

export default function Instructions() {
  return (
    <Container>
      <h1>Click on your color.</h1>
      <p>⚠️ Only the color of the word matters, not the word itself.</p>
    </Container>
  );
}
