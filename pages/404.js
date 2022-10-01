import React from 'react';
import Mixpanel from '../utils/Mixpanel';

import { MainContainer, Container, PageHeadline } from '../components';

export default function Custom404() {
  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_404_ERROR_PAGE');

  const text = {
    title: 'Нет такой страницы',
  };

  return (
    <MainContainer>
      <Container small>
        <PageHeadline title={text.title} />
      </Container>
    </MainContainer>
  );
}
