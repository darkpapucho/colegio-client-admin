import { ReactNode } from 'react';
import { ContainerProps } from '../../shared/Container';

export type TableProps = ContainerProps & {
  $gridTempCols: string;
  $color?: string;
  $fontSize?: string;
  children: ReactNode;
  $headerPadding?: string;
};
