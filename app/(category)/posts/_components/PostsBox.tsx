'use client';

import { useState, useEffect } from 'react';

import { ReceivedPostType } from '@/lib/types/PostType';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';

import PostLists from '@/app/(category)/posts/_components/PostLists';

const PostsBox = ({ type }: { type: string }) => {
  const [data, setData] = useState<ReceivedPostType | null>(null);

  useEffect(() => {
    const fetchPostType = async (type: string) => {
      const url =
        type === 'series' ? BACKEND_ROUTES.SERIES : BACKEND_ROUTES.SNIPPETS;
      try {
        const res = await clientComponentFetch(url);
        setData(res);
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch ${type} data`);
      }
    };
    fetchPostType(type);
  }, [type]);

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
