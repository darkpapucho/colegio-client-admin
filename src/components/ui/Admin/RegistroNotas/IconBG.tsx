import styled, { css } from 'styled-components';
import { Icon } from '../../../shared/Icon';

export const IconBG = styled(Icon)<{ $isCompleted: boolean }>`
  > svg {
    color: ${({ $isCompleted, theme }) => ($isCompleted ? theme.colors.green[700] : theme.colors.red[500])};
    ${({ $isCompleted, theme }) => {
      if ($isCompleted) {
        return css`
          color: ${theme.colors.green[700]};
          &:hover {
            color: ${theme.colors.green[500]};
            transform: scale(1.05);
          }
        `;
      } else {
        return css`
          color: ${theme.colors.red[700]};
          &:hover {
            color: ${theme.colors.red[500]};
            transform: scale(1.05);
          }
        `;
      }
    }}
  }
  font-size: 1.4rem;
`;
