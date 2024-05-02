'use client';

import { useQuery } from '@tanstack/react-query';

import { ReceivedPostType } from '@/lib/types/PostType';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';

import PostLists from '@/app/(category)/posts/_components/PostLists';

const fetchPostType = async (
  type: string
): Promise<ReceivedPostType | null> => {
  const url =
    type === 'series' ? BACKEND_ROUTES.SERIES : BACKEND_ROUTES.SNIPPETS;
  try {
    const res = await clientComponentFetch(url);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const PostsBox = ({ type }: { type: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [type],
    queryFn: () => fetchPostType(type),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>fetch error post {type}</p>;

  const postType = data?.type;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-xl font-semibold flex gap-2 items-end">
        {type[0].toLocaleUpperCase() + type.slice(1)} Posts
        <p className="text-sm">({postType?.length})</p>
      </div>
      {postType?.map((post) => (
        <PostLists key={post.id} {...post} type={type} />
      ))}
    </div>
  );
};

export default PostsBox;
