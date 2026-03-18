'use client';

import { Container } from '@prosazhin/pbcomponents';
import { ReactNode } from 'react';

const PageWithLeftAside = ({
  children,
  aside,
  size = 's',
}: {
  children: ReactNode;
  aside: ReactNode;
  size?: 's' | 'm' | 'full';
}) => {
  return (
    <Container size={size}>
      <Container.LeftAside>{aside}</Container.LeftAside>
      <Container.Main>{children}</Container.Main>
    </Container>
  );
};

export default PageWithLeftAside;
