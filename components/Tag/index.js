import React from 'react';
import Link from 'next/link';
import style from './Tag.module.scss';

export function ClickableTag({ title, active, pageLink, url }) {
  return (
    <Link href={active ? `/${pageLink}` : `/${pageLink}?tag=${url}`} className={`${style.tag} ${style.tag__clickable}${active ? ` ${style.tag__clickable_active}` : ''}`}>
      {title}
    </Link>
  );
}

export function StaticActiveTag({ title, active }) {
  return <span className={`${style.tag} ${style.tag__static}${active ? ` ${style.tag__static_active}` : ''}`}>{title}</span>;
}

export function StaticTag({ title }) {
  return <span className={`${style.tag} ${style.tag__static}`}>{title}</span>;
}
