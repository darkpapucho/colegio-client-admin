import { ToasterProps } from 'react-hot-toast';
import { theme } from '../styled/styled';

export const toastArgs: ToasterProps = {
  position: 'top-center',
  gutter: 12,
  containerStyle: {
    margin: '8px',
  },
  toastOptions: {
    success: {
      duration: 3000,
      style: {
        backgroundColor: theme.colors.green[100],
        color: theme.colors.green[800],
      },
    },
    error: {
      duration: 3000,
      style: {
        backgroundColor: theme.colors.red[100],
        color: theme.colors.red[800],
      },
    },
    style: {
      fontSize: theme.fontSizes.md,
      maxWidth: '500px',
      padding: '16px 24px',
      backgroundClip: theme.colors.gray[0],
      color: theme.colors.gray[700],
    },
  },
};
