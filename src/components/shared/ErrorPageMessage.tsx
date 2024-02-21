import styled from 'styled-components';

export const StyledErrorPageMessage = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  > h1 {
    font-size: 3.5rem;
    width: 30rem;
    font-family: 'Courier New', Courier, monospace;
  }
`;

export default function ErrorPageMessage({ message }: { message: string }) {
  return (
    <StyledErrorPageMessage>
      <h1>{message}</h1>
    </StyledErrorPageMessage>
  );
}
