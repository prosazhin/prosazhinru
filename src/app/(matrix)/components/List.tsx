'use client';

import { LangType, MatrixType } from '@/types';
import { Badge } from '@prosazhin/pbcomponents';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const getRating = (locale: LangType, value: number) => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
};

const CategoryList = ({ matrix, locale }: MatrixType) => {
  const { t } = useTranslation();

  const { categories, totalRating } = useMemo(() => {
    const result = [...matrix.category];

    const total = matrix.category.reduce((acc, { competencies }, index) => {
      const summary = competencies.reduce((acc, cur) => acc + cur.rating, 0) / competencies.length;
      result[index].rating = getRating(locale, summary);

      return acc + summary;
    }, 0);

    return { categories: result, totalRating: getRating(locale, total) };
  }, [matrix, locale]);

  if (!categories.length) {
    return;
  }

  return (
    <ul className='mt-40 flex w-full flex-col gap-y-40'>
      <li className='flex w-full flex-col'>
        <span className='mb-8 flex w-full flex-row items-center gap-x-16 px-16'>
          <h2 className='text-tm20 text-basic-main flex-1'>{t('result')}</h2>
          <Badge size='s'>{totalRating}</Badge>
        </span>
        <ul className='rounded-8 divide-secondary-lighter border-secondary-lighter flex w-full flex-col divide-y-1 border-1'>
          {categories.map(({ id, title, rating }) => (
            <li
              className='flex w-full flex-row items-center gap-x-16 px-16 py-12'
              key={id}
            >
              <h3 className='text-t16 text-basic-main flex-1'>{title}</h3>
              <Badge
                size='s'
                color='secondary'
                theme='border'
              >
                {rating}
              </Badge>
            </li>
          ))}
        </ul>
      </li>
      {categories.map(({ id, title, rating, competencies }) => (
        <li
          className='flex w-full flex-col'
          key={id}
        >
          <span className='mb-8 flex w-full flex-row items-center gap-x-16 px-16'>
            <h2 className='text-tm20 text-basic-main flex-1'>{title}</h2>
            <Badge
              size='s'
              color='secondary'
              theme='border'
            >
              {rating}
            </Badge>
          </span>
          {competencies.length && (
            <ul className='rounded-8 divide-secondary-lighter border-secondary-lighter flex w-full flex-col divide-y-1 border-1'>
              {competencies.map((item) => (
                <li
                  className='flex w-full flex-row items-center gap-x-16 px-16 py-12'
                  key={item.id}
                >
                  <h3 className='text-t16 text-basic-main flex-1'>{item.title}</h3>
                  <Badge
                    size='s'
                    color='secondary'
                    theme='light'
                  >
                    {item.rating}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
