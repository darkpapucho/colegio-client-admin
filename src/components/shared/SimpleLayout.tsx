import React, { ReactNode } from 'react';
import { Container } from './Container';
import { Title } from './Title';

export default function SimpleLayout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <Container $direction="column" $padding="2rem" $gap="2rem">
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
}
