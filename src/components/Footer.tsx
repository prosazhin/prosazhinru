import contacts from '@/data/contacts';
import { LangType } from '@/types';
import { getDictionary } from '@/utils/get-dictionaries';
import dayjs from 'dayjs';

import Container from '@/components/Container';

type Props = {
  lang: LangType;
};

const Footer = async ({ lang }: Props) => {
  const t = await getDictionary(lang);

  return (
    <footer className="block w-full border-t border-secondary-lighter py-[24px]">
      <Container>
        <div className="flex w-full flex-col space-y-[16px]">
          <ul className="flex flex-col sm:space-y-[8px] desktop:flex-row desktop:space-x-[32px]">
            {contacts.map((contact) => (
              <li className="inline-block" key={contact.url}>
                {contact.link ? (
                  <a
                    className="transition text-tm3 text-primary-main hover:text-danger-main hover:underline"
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contact.title}
                  </a>
                ) : (
                  <span className="text-tm3 text-base-main">{contact.title}</span>
                )}
              </li>
            ))}
          </ul>
          <span className="w-full text-t4 text-base-light">
            © 2017 — {dayjs().format('YYYY')}, {t.name}
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
