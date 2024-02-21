import styled, { css, DefaultTheme } from 'styled-components';

const sizes = (theme: DefaultTheme) => {
  return {
    small: css`
      font-size: ${theme.fontSizes.sm};
      padding: ${({ theme }) => theme.padding.tiny};
      text-transform: capitalize;
      font-weight: 400;
    `,
    medium: css`
      font-size: ${theme.fontSizes.md};
      padding: ${({ theme }) => theme.padding.sm};
      font-weight: 500;
    `,
    large: css`
      font-size: ${theme.fontSizes.lg};
      padding: ${({ theme }) => theme.padding.md};
      font-weight: 500;
    `,
  };
};

const variations = (theme: DefaultTheme) => {
  return {
    primary: css`
      color: ${theme.colors.gray[100]};
      background-color: ${theme.colors.orange[800]};

      &:hover {
        background-color: ${theme.colors.orange[400]};
      }
    `,
    secondary: css`
      color: ${theme.colors.gray[100]};
      background: ${theme.colors.indigo[500]};
      /* border: 1px solid ${theme.colors.gray[300]}; */

      &:hover {
        background-color: ${theme.colors.gray[100]};
      }
    `,
    danger: css`
      color: ${theme.colors.gray[100]};
      background-color: ${theme.colors.red[700]};

      &:hover {
        background-color: ${theme.colors.red[800]};
      }
    `,
  };
};
interface Props {
  $primary?: boolean;
  $secondary?: boolean;
  $medium?: boolean;
  $large?: boolean;
  $small?: boolean;
  $danger?: boolean;
  $width?: string;
}

export const Button = styled.button<Props>`
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Lato', sans-serif;
  border: none;
  font-size: 1.2rem;

  padding: 0.4rem 0.8rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.colors.gray[500]};
  border: 1px solid ${(props) => props.theme.colors.gray[500]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.93);
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.gray[600]};
  }
  &:disabled {
    &:hover {
      background-color: ${(props) => props.theme.colors.gray[500]};
    }
    background-color: ${(props) => props.theme.colors.gray[500]};
  }
  ${(props) => {
    if (props.$large) {
      return sizes(props.theme)['large'];
    }
    if (props.$small) {
      return sizes(props.theme)['small'];
    }
    if (props.$medium) {
      return sizes(props.theme)['medium'];
    }
  }}
  ${(props) => {
    if (props.$primary) {
      return variations(props.theme)['primary'];
    }
    if (props.$secondary) {
      return variations(props.theme)['secondary'];
    }
    if (props.$danger) {
      return variations(props.theme)['danger'];
    }
  }}
`;
// Button.defaultProps = {
//   $primary: true,
//   $small: true,
// };
