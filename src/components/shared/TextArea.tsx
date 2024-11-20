import styled, { css } from 'styled-components';

const TextArea = styled('textarea')<{ $width?: string; $minHeight?: string }>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  ${({ $minHeight }) =>
    $minHeight &&
    css`
      min-height: ${$minHeight};
    `};
  resize: none;
  outline: none;
`;
export default TextArea;
