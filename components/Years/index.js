import React from 'react';
import numeralize from 'numeralize-ru';
import style from './Years.module.scss';

export default function Years({ array }) {
  return (
    <ul className={style.years}>
      {array
        .sort((a, b) => b.title - a.title)
        .map((item, index) => (
          <li className={style.year} key={item.title}>
            <span className={style.year__headline}>{item.title}</span>
            <ul className={style.logs}>
              {!item.job.fired && !item.job.hired && !!item.job.work && (
                <li className={style.log}>
                  <span className={style.log__title}>{index === 0 ? 'Работаю в' : 'Работал в'}</span>
                  <span className={style.log__value}>{item.job.work.title}</span>
                </li>
              )}
              {item.job.fired && (
                <li className={style.log}>
                  <span className={style.log__title}>Уволился из</span>
                  <span className={style.log__value}>{item.job.fired.title}</span>
                </li>
              )}
              {item.job.hired && (
                <li className={style.log}>
                  <span className={style.log__title}>Устроился в</span>
                  <span className={style.log__value}>{item.job.hired.title}</span>
                </li>
              )}
              {!!item.links.length && (
                <li className={style.log}>
                  <span className={style.log__title}>Добавил</span>
                  <span className={style.log__value}>
                    {item.links.length} {numeralize.pluralize(item.links.length, 'ссылку', 'ссылки', 'ссылок')}
                  </span>
                </li>
              )}
              {!!item.selections.length && (
                <li className={style.log}>
                  <span className={style.log__title}>Составил</span>
                  <span className={style.log__value}>
                    {item.selections.length} {numeralize.pluralize(item.selections.length, 'подборку', 'подборки', 'подборок')}
                  </span>
                </li>
              )}
              {!!item.posts.length && (
                <li className={style.log}>
                  <span className={style.log__title}>Написал</span>
                  <span className={style.log__value}>
                    {item.posts.length} {numeralize.pluralize(item.posts.length, 'заметку', 'заметки', 'заметок')}
                  </span>
                </li>
              )}
              {!!item.projects.length && (
                <li className={style.log}>
                  <span className={style.log__title}>Сделал</span>
                  <span className={style.log__value}>
                    {item.projects.length} {numeralize.pluralize(item.projects.length, 'проект', 'проекта', 'проектов')}
                  </span>
                </li>
              )}
            </ul>
          </li>
        ))}
    </ul>
  );
}
