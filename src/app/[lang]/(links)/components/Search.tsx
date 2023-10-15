'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useDebounce } from 'react-use';

import { LinksType } from '@/types';
import getQuery from '@/utils/get-query';

import Input from '@/components/Input';

type Props = {
  placeholder: string;
  type: LinksType;
};

const Search = ({ placeholder, type }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const activeTag = params?.get('tag');
  const query = params?.get('query');
  const [search, setSearch] = useState(query || '');

  useDebounce(() => router.push(getQuery(type, search, activeTag)), 300, [search, activeTag]);

  return (
    <>
      <Input
        place="left"
        placeholder={placeholder}
        value={search}
        type="text"
        id="search"
        name="search"
        onChange={(value) => setSearch(value)}
      >
        <MagnifyingGlassIcon className="h-[24px] w-[24px] text-base-light" />
      </Input>
    </>
  );
};

export default Search;
