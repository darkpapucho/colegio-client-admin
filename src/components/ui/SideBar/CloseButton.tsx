import styled from 'styled-components';
import { theme } from '../../../config/styled/styled';

import { IoClose } from 'react-icons/io5';
import { Icon } from '../../shared/Icon';
const CloseButtonContainer = styled.div`
  position: absolute;
  right: -20px;
  top: 150px;
  padding: 1rem;
  border-radius: 50%;
  border: 1px solid black;
  background-color: red;

  @media (min-width: ${theme.mediaScreen.small}) {
    display: none;
  }
`;

export default function CloseButton({ action }: { action: () => void }) {
  return (
    <CloseButtonContainer id="CloseMenuButton" onClick={() => action()}>
      <Icon $color="white" $small $pointer>
        <IoClose />
      </Icon>
    </CloseButtonContainer>
  );
}
