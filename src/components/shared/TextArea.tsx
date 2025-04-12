import styled from 'styled-components';
import { CSSProperties } from 'react';

type TextAreaProps = {
  $width?: string;
  $minHeight?: string;
};
type ExtendedCSSProperties = CSSProperties & { fieldSizing?: 'content' | 'fixed' };

const TextArea = styled.textarea.attrs(() => ({ style: { fieldSizing: 'content' } as ExtendedCSSProperties }))<TextAreaProps>`
  margin-top: 1rem;
  border: 2px solid orange;
  padding: 0.2rem 0.5rem;
  width: ${({ $width }) => ($width ? $width : '100%')};
  min-height: ${({ $minHeight }) => ($minHeight ? $minHeight : '8rem')};
  resize: none;
  outline: none;
`;

export default TextArea;
