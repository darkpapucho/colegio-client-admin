import styled, { css } from 'styled-components';
import { Align, WidthCss } from '../../types/globals';

export const ErrMessage = styled.p<{ $align?: Align; $width?: WidthCss }>`
  width: 100%;
  color: ${({ theme }) => theme.colors.red[700]};
  margin: 0;
  padding: 0.4rem;
  background-color: #ff7d7d;
  text-align: ${({ $align }) => ($align === 'center' ? 'center' : $align === 'right' ? 'right' : 'left')};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

export function ErrorMessage({ message, align, width }: { message: string; align?: Align; width?: WidthCss }) {
  return (
    <ErrMessage $align={align} $width={width}>
      {message}
    </ErrMessage>
  );
}
