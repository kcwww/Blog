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
    <div className="w-full">
      <h1 className="text-2xl flex justify-center 2xl:justify-start mb-8 opacity-0 animate-fade-in ">
        Featured Posts
      </h1>
      <div className="w-full flex justify-center items-center">
        <div className="grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 2xl:gap-12">
          {data.map((post: RecievedPostType, index: number) => {
            post.index = index;
            return <PostCard key={post.id} {...post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
