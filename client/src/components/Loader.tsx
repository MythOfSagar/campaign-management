import React from "react";
import styled from "styled-components";
import {ThreeDots} from 'react-loader-spinner'

const Loader = () => {
    return (
      <LoaderContainer>
      <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      </LoaderContainer>
    );
};

export default Loader;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  gap: 10px;
  z-index:1000000;
`;

