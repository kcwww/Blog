'use client';

import { useQuery } from '@tanstack/react-query';

import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';
import { ReceiveTagType } from '@/lib/types/TagType';

import TagBadge from '@/app/(category)/posts/_components/TagBadge';

const fetchTags = async (): Promise<ReceiveTagType | null> => {
  try {
    const res = await clientComponentFetch(BACKEND_ROUTES.TAGS);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Tags = () => {
  const { data, isLoading, isError } = useQuery<ReceiveTagType | null>({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  if (isLoading) return <></>;
  if (isError) return <p>Failed to fetch tags</p>;

  const tags = data?.tags;

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in-delay opacity-0">
      <div className="text-xl font-semibold flex gap-2 items-end">
        Tags <p className="text-sm">({tags?.length})</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <TagBadge key={tag.id} name={tag.id} count={tag.posts.length} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
