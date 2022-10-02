import React from 'react';
import style from './SocialLinks.module.scss';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

export default function SocialLinks({ data }) {
  const filteredData = data.filter((item) => item !== null);
  if (filteredData.length === 0) return null;
  return (
    <div className={style.wrapper}>
      {filteredData.map((item) => (
        <span
          className={style.link}
          onClick={(event) => {
            event.stopPropagation();
            window.open(item.url, '_blank', 'noopener,noreferrer');
          }}
        >
          <span>{item.title}</span>
          <ArrowLongRightIcon className={style.link__icon} />
        </span>
      ))}
    </div>
  );
}
