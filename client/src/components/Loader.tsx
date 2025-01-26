import React from "react";

import styled, { keyframes } from "styled-components";

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </LoaderContainer>
  );
};

export default Loader;

const blink = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000000;
`;

const Dot = styled.div<{ delay: string }>`
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: #3498db; /* Customize your color */
  border-radius: 50%;
  animation: ${blink} 1.4s infinite;
  animation-delay: ${(props) => props.delay};
`;
