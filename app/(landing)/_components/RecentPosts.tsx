'use client';

import { useQuery } from '@tanstack/react-query';

import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { BACKEND_ROUTES } from '@/constants/routes';
import PostCard from '@/components/Post/PostCard';
import { RecievedPostType } from '@/lib/types/PostType';

const fetchPostsData = async () => {
  try {
    const res = await clientComponentFetch(BACKEND_ROUTES.RECENT);

    return res.posts;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const RecentPosts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPostsData,
  });

  if (isLoading) return <SkeletonCard />;
  if (isError) return <p>데이터를 가져오는데 실패하였습니다. {data}</p>;

  return (
    <>
      {data.map((post: RecievedPostType) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </>
  );
};

export default RecentPosts;
