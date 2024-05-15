import { redirect } from 'next/navigation';

import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import { ReceivedTagsType } from '@/lib/types/TagType';

import TagBadge from '@/app/(category)/posts/_components/TagBadge';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';

const fetchTags = async () => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.TAGS);
    return res;
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const Tags = async () => {
  const data = (await fetchTags()) as ReceivedTagsType;
  const tags = data.tags;

  return (
    <div className="flex w-full animate-fade-in-delay flex-col gap-4 opacity-0">
      <div className="flex items-end gap-2 text-xl font-semibold">
        Tags <p className="text-sm">({tags?.length})</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagBadge key={tag.id} name={tag.id} count={tag.posts.length} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
