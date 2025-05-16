import contacts from '@/data/contacts';
import { initTranslations } from '@/i18n';
import { LangType } from '@/types';
import { Container } from '@pbcomponents/react';
import dayjs from 'dayjs';

const Footer = async ({ locale }: { locale: LangType }) => {
  const { t } = await initTranslations(locale);

  return (
    <footer className='border-secondary-lighter block w-full border-t-1 py-24 print:hidden'>
      <Container size='m'>
        <div className='flex w-full flex-col gap-y-16'>
          <ul className='desktop:flex-row desktop:gap-x-32 flex flex-col gap-y-8'>
            {contacts.map((contact) => (
              <li
                className='link inline-block'
                key={contact.url}
              >
                {contact.link ? (
                  <a
                    className='text-tm16'
                    href={contact.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {contact.title}
                  </a>
                ) : (
                  <span className='text-tm16 text-basic-main'>{contact.title}</span>
                )}
              </li>
            ))}
          </ul>
          <span className='text-t12 text-basic-light w-full'>
            © 2017 — {dayjs().format('YYYY')}, {t('name')}
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
