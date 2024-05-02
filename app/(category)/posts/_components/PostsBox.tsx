'use client';

import { useQuery } from '@tanstack/react-query';

import { ReceivedPostType } from '@/lib/types/PostType';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';

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

  console.log(data);

  return (
    <div>
      <h1>{type} Posts</h1>
    </div>
  );
};

export default PostsBox;
