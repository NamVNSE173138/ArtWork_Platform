// Pin.tsx
import React from "react";
import styled from "styled-components";

interface PinProps {
  urls: {
    regular: string;
  };
}

const Pin: React.FC<PinProps> = ({ urls }) => {
  return (
    <Wrapper>
      <Container>
        <img src={urls?.regular} alt="pin" />
      </Container>
    </Wrapper>
  );
};

export default Pin;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: 236px;

  img {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 16px;
    object-fit: cover;
  }
  img:hover {
    filter: brightness(70%);
  }
`;
