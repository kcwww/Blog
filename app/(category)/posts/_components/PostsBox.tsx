'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ReceivedPostType } from '@/lib/types/PostType';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';

import PostLists from '@/app/(category)/posts/_components/PostLists';

const PostsBox = ({ type }: { type: string }) => {
  const [data, setData] = useState<ReceivedPostType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPostType = async (type: string) => {
      const url =
        type === 'series' ? BACKEND_ROUTES.SERIES : BACKEND_ROUTES.SNIPPETS;
      try {
        const res = await clientComponentFetch(url);
        setData(res);
      } catch (error) {
        console.error(error);
        router.replace(ROUTES.NOT_FOUND);
      }
    };
    fetchPostType(type);
  }, [type, router]);

  if (!data) return <></>;

  const postType = data?.type;

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in-delay opacity-0">
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
