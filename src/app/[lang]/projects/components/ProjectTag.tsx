'use client';

import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

import Tag from '@/components/Tag';

type Props = {
  title: string;
  url: string;
};

const ProjectTag = ({ title, url }: Props) => {
  return (
    <Tag
      tag="button"
      type="button"
      title={title}
      size="xs"
      theme="border"
      place="right"
      onClick={() => window.open(url, '_blank')}
    >
      <ArrowLongRightIcon className="h-[16px] w-[16px]" />
    </Tag>
  );
};

export default ProjectTag;
