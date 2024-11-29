import contacts from '@/data/contacts';
import { initTranslations } from '@/i18n';
import { LangType } from '@/types';
import { Container } from '@pbcomponents/react';
import dayjs from 'dayjs';

const Footer = async ({ locale }: { locale: LangType }) => {
  const { t } = await initTranslations(locale);

  return (
    <footer className="block w-full py-24 border-t-1 border-secondary-lighter">
      <Container size="m">
        <div className="flex flex-col w-full gap-y-16">
          <ul className="flex flex-col gap-y-8 desktop:flex-row desktop:gap-x-32">
            {contacts.map((contact) => (
              <li className="inline-block link" key={contact.url}>
                {contact.link ? (
                  <a className="text-tm16" href={contact.url} target="_blank" rel="noreferrer">
                    {contact.title}
                  </a>
                ) : (
                  <span className="text-tm16 text-basic-main">{contact.title}</span>
                )}
              </li>
            ))}
          </ul>
          <span className="w-full text-t12 text-basic-light">
            © 2017 — {dayjs().format('YYYY')}, {t('name')}
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
