import { RefObject, forwardRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Icon } from './Icon';
import { theme } from '../../config/styled/styled';
export const SContainer = styled.div<{ $width?: string; $type: string; $isError?: boolean }>`
  position: relative;
  ${({ $width }) =>
    $width &&
    css`
      width: 100%;
    `}
  &>input {
    ${({ $width }) =>
      $width &&
      css`
        width: 100%;
      `}
    outline: none;
    border: none;
    border-bottom: ${({ $type }) => ($type === 'date' ? 'none' : '1px solid black')};
    border-color: ${({ theme, $isError }) => ($isError ? theme.colors.red[500] : theme.colors.tertiary[700])};
    height: 3rem;
    padding-left: 5px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fontFamily.text};
    &:focus {
      outline: none;
      border-bottom: 3px solid ${theme.colors.secondary[900]};
    }
    &[type='date'] {
      background-color: rgba(0, 0, 0, 0);
      &::-webkit-calendar-picker-indicator {
        //display: none;
        //-webkit-appearance: none;
        height: 20px;
        position: relative;
        width: 20px;
        cursor: pointer;
      }
      &::-webkit-calendar-picker-indicator:hover {
        transform: scale(1.1);
      }
    }
  }
`;
const SLabel = styled.label<{ $hasContent: boolean; $type: string }>`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fontFamily.header};
  position: ${({ $type }) => ($type === 'date' ? 'relative' : 'absolute')};
  border: 2px;
  left: 5px;
  top: 0px;
  font-style: italic;
  ${({ $hasContent, $type }) =>
    $hasContent &&
    $type !== 'date' &&
    css`
      font-size: ${({ theme }) => theme.fontSizes.sm};
      top: -20px;
    `}
  transition:all .5s;
`;

//main input  componentt
const Input = forwardRef(function InputComponent({ name, type, $width, label, isError }: { $width?: string; name: string; type: string; label: string; isError?: boolean }, ref) {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    if (value !== '') {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [value]);
  return (
    <SContainer $width={$width} $type={type} $isError={isError}>
      <SLabel htmlFor={name} $hasContent={hasContent} $type={type}>
        {label}
      </SLabel>
      <input
        id={name}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref as RefObject<HTMLInputElement>}
      />
      {type === 'password' &&
        (showPassword ? (
          <Icon $small $inset="2px 2px 30% 90%">
            <HiOutlineEyeOff onClick={() => setShowPassword((old) => !old)} />
          </Icon>
        ) : (
          <Icon $small $inset="2px 2px 30% 90%">
            <HiOutlineEye onClick={() => setShowPassword((old) => !old)} />
          </Icon>
        ))}
    </SContainer>
  );
});
export default Input;
