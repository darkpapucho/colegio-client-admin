import styled from 'styled-components';
import { WidthCss } from '../../types/globals';

export const StyledInput = styled.input<{ $width?: WidthCss }>`
  outline: none;
  border: none;
  padding: 4px;
  font-family:${({ theme }) => theme.fontFamily.sourceSans}
  &:disabled {
    border: none;
  }
  font-size: 1.2rem;
`;
