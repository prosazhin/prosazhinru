import React from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../../context';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { MainWrapper, MainContainer, Container, PageHeadline, LinkTabs } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'contacts');
  const contacts = method.contacts.serializer(await method.contacts.getList());

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
    },
  };
}

export default function ContactsPage({ page, navigations, contacts }) {
  const router = useRouter();
  const context = useAppContext();

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_ABOUT_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing/about.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <LinkTabs array={context.aboutTabs} customClass={style.tabs} />
          <PageHeadline title={page.title} description={page.description} />
          <ul className={style.contacts}>
            {contacts
              .sort((a, b) => a.order - b.order)
              .map((contact) => (
                <li className={style.contacts__item} key={contact.id}>
                  {contact.link ? (
                    <a className={`${style.contact} ${style.link}`} href={contact.url} target="_blank" rel="noreferrer">
                      <span className={style.contact__wrapper}>
                        <span className={style.contact__title}>{contact.title}</span>
                        <span className={style.contact__description}>{contact.url}</span>
                      </span>
                      <ArrowLongRightIcon className={style.link__icon} />
                    </a>
                  ) : (
                    <span className={style.contact}>
                      <span className={style.contact__title}>{contact.title}</span>
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
