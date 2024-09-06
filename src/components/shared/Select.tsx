import { useState } from 'react';
import styled, { css } from 'styled-components';
import { publishEvent } from '../../utils/customEvent';
import useClickOutside from '../../hooks/useClickOutside';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Icon } from './Icon';

const StyledSelect = styled.div<{ $height?: string; $width?: string; $tiny?: boolean; $small?: boolean; $rect?: boolean }>`
  padding-left: 2px;
  background-color: ${({ theme }) => theme.colors.secondary[500]};
  border-radius: 6px;
  color: white;
  height: max-content;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  position: relative;
  ${({ $tiny, theme }) =>
    $tiny &&
    css`
      font-size: ${theme.fontSizes.tiny};
    `}
  ${({ $small, theme }) =>
    $small &&
    css`
      font-size: ${theme.fontSizes.sm};
    `}
  font-family: ${({ theme }) => theme.fontFamily.header};

  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  ${({ $rect }) =>
    $rect &&
    css`
      border-radius: 0;
    `}
`;

const StyledSelectOpts = styled.div<{ $isOpen: boolean }>`
  /* border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black; */

  z-index: 10;
  width: 100%;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      display: none;
    `}
`;
const StyledOpt = styled.div<{ $tiny?: boolean; $small?: boolean; $primary?: boolean }>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.secondary[700]};
  width: 100%;
  ${({ $tiny, theme }) =>
    $tiny &&
    css`
      padding: ${theme.padding.tiny};
    `}
  ${({ $small, theme }) =>
    $small &&
    css`
      padding: ${theme.padding.sm};
    `}
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary[500]};
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
const StyledSelectedOpt = styled.div<{ $tiny?: boolean; $small?: boolean; $bgColor?: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;

  ${({ $tiny, theme }) =>
    $tiny &&
    css`
      padding: ${theme.padding.tiny};
    `}
  ${({ $small, theme }) =>
    $small &&
    css`
      padding: ${theme.padding.sm};
    `}
    ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `}
`;

//#MAIN FUNCTIONAL COMPONENT

interface SelectProps<T> {
  width?: string;
  name: string;
  options: { label: string; value: T }[];
  defaultValue?: { label: string; value: T | null };
  small?: boolean;
  tiny?: boolean;
  label: string;
  height?: string;
  bgColor?: string;
  rect?: boolean;
}
export default function Select<T>({ name, label, options, width, defaultValue, small, tiny, bgColor, height, rect }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: T | null }>(defaultValue ? defaultValue : { label: label, value: null });
  const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  function toggle() {
    setIsOpen((old) => !old);
  }

  return (
    <StyledSelect $width={width} ref={ref} $small={small} $tiny={tiny} $height={height} $rect={rect}>
      <StyledSelectedOpt onClick={() => toggle()} $small={small} $tiny={tiny} $bgColor={bgColor}>
        {selectedOption.label}
        {isOpen ? (
          <Icon $tiny>
            <BsChevronUp />
          </Icon>
        ) : (
          <Icon $tiny>
            <BsChevronDown />
          </Icon>
        )}
      </StyledSelectedOpt>
      <StyledSelectOpts $isOpen={isOpen}>
        {options.map((option) => {
          return (
            <StyledOpt key={option.label} onClick={() => handleClick(option)} $small={small} $tiny={tiny}>
              {option.label}
            </StyledOpt>
          );
        })}
      </StyledSelectOpts>
    </StyledSelect>
  );
  function handleClick(option: { label: string; value: T }) {
    setSelectedOption(option);
    publishEvent<T>('customSelect', { name, value: option.value });
    setIsOpen(false);
  }
}
