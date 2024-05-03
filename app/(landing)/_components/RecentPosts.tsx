'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Milestone } from 'lucide-react';

import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import PostCard from '@/components/Post/PostCard';
import { ReceivedPostDataType } from '@/lib/types/PostType';

const RecentPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const res = await clientComponentFetch(BACKEND_ROUTES.RECENT);
        setData(res.posts);
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch posts data');
      }
    };
    fetchPostsData();
  }, []);

  if (data.length === 0) {
    return (
      <>
        <div className="h-[2rem]" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 2xl:gap-12 w-full">
          <SkeletonCard />
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl flex justify-center md:justify-start mb-8 opacity-0 animate-fade-in ">
        Featured Posts
      </h1>
      <div className="w-full flex justify-center items-center">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 2xl:gap-12">
          {data.map((post: ReceivedPostDataType, index: number) => {
            post.index = index;
            return <PostCard key={post.id} {...post} />;
          })}
        </div>
      </div>
      <Link
        className="mt-4 flex gap-2 hover:bg-gray-300 dark:hover:bg-gray-800 items-center w-fit rounded-md p-2 transition-colors ease-out opacity-0 animate-fade-in"
        href={ROUTES.POSTS}
      >
        <Milestone size={'1rem'} />
        view all posts...
      </Link>
    </div>
  );
};

export default RecentPosts;
