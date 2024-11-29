'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LangType, MatrixType } from '@/types';
import { Badge } from '@pbcomponents/react';

const getRating = (locale: LangType, value: number) => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
};

const CategoryList = ({ matrix, locale }: MatrixType) => {
  const { t } = useTranslation();
  const [totalRating, setTotalRating] = useState<string>('');

  const categories = useMemo(() => {
    const result = [...matrix.category];

    const total = matrix.category.reduce((acc, { competencies }, index) => {
      const summary = competencies.reduce((acc, cur) => acc + cur.rating, 0) / competencies.length;
      result[index].rating = getRating(locale, summary);

      return acc + summary;
    }, 0);

    setTotalRating(getRating(locale, total));

    return result;
  }, [matrix, locale]);

  return (
    <ul className="flex flex-col w-full mt-40 gap-y-40">
      <li className="flex flex-col w-full">
        <span className="flex flex-row items-center w-full px-16 mb-8 gap-x-16">
          <h2 className="flex-1 text-tm20 text-basic-main">{t('result')}</h2>
          <Badge size="s">{totalRating}</Badge>
        </span>
        <ul className="flex flex-col w-full border-1 divide-y-1 rounded-8 divide-secondary-lighter border-secondary-lighter">
          {categories.map(({ title, rating }, index) => (
            <li className="flex flex-row items-center w-full px-16 py-12 gap-x-16" key={index}>
              <h3 className="flex-1 text-t16 text-basic-main">{title}</h3>
              <Badge size="s" color="secondary" theme="border">
                {rating}
              </Badge>
            </li>
          ))}
        </ul>
      </li>
      {categories.map(({ title, rating, competencies }, index) => (
        <li className="flex flex-col w-full" key={index}>
          <span className="flex flex-row items-center w-full px-16 mb-8 gap-x-16">
            <h2 className="flex-1 text-tm20 text-basic-main">{title}</h2>
            <Badge size="s" color="secondary" theme="border">
              {rating}
            </Badge>
          </span>
          <ul className="flex flex-col w-full border-1 divide-y-1 rounded-8 divide-secondary-lighter border-secondary-lighter">
            {competencies.map((item) => (
              <li className="flex flex-row items-center w-full px-16 py-12 gap-x-16" key={item.id}>
                <h3 className="flex-1 text-t16 text-basic-main">{item.title}</h3>
                <Badge size="s" color="secondary" theme="light">
                  {item.rating}
                </Badge>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
