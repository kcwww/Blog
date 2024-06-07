'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';
import DataTable from '@/components/Post/DataTable';
import CheckAuth from '@/app/(protected)/admin/_components/CheckAuth';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';

export type DataTableType = Omit<PostDataType, 'post'> & {
  title: string;
  createdAt: string;
  type: string;
  name: string;
  id: string;
};

const AdminPage = () => {
  const [posts, setPosts] = useState<DataTableType[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await clientComponentFetch(BACKEND_ROUTES.POSTS);
        const posts = res.posts.map((post: PostDataType) => {
          return {
            id: post.id,
            title: post.title,
            createdAt: post.createdAt,
            type: post.post?.type,
            name: post.post?.name,
          };
        });
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <CheckAuth>
      <DataTable posts={posts} />
      <Link href={ROUTES.NEW_POST}>
        <Button>새 글 작성</Button>
      </Link>
    </CheckAuth>
  );
};

export default AdminPage;
