'use client';

import getQuery from '@/utils/get-query';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@pbcomponents/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebounce } from 'react-use';

const Search = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params?.get('type');
  const activeTag = params?.get('tag');
  const query = params?.get('query');
  const [search, setSearch] = useState(query || '');

  useDebounce(() => router.push(getQuery(type, search, activeTag)), 150, [search, activeTag, type]);

  return (
    <Input
      placeholder={placeholder}
      value={search}
      type='search'
      leftIcon={MagnifyingGlassIcon}
      onChange={(value) => setSearch(value)}
    />
  );
};

export default Search;
