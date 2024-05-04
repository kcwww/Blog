'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';
import DataTable from '@/components/Post/DataTable';

export type DataTableType = Omit<PostDataType, 'post'> & {
  type: string;
  name: string;
  post?: {
    type: string;
    name: string;
  };
};

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<DataTableType[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(BACKEND_ROUTES.LOGIN);
    }

    if (
      status === 'authenticated' &&
      session?.user?.email !== process.env.NEXT_PUBLIC_ACCOUNT
    ) {
      toast.error('권한이 없습니다.');
      signOut({ redirect: false });
      router.replace(ROUTES.LANDING);
    }
  }, [status]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await clientComponentFetch(BACKEND_ROUTES.POSTS);
      const posts = res.posts.map((post: DataTableType) => {
        if (post.post === null) {
          delete post.post;
          return { ...post, type: '', name: '' };
        }

        const obj = {
          ...post,
          type: post.post?.type || '',
          name: post.post?.name || '',
        };
        delete obj.post;
        return obj;
      });

      setPosts(posts);
      console.log(posts);
    };

    fetchAllPosts();
  }, []);

  if (!posts) return <div>Loading...</div>;

  return (
    <>
      <DataTable posts={posts} />
      <Link href={ROUTES.NEW_POST}>
        <Button>새 글 작성</Button>
      </Link>
    </>
  );
};

export default AdminPage;
