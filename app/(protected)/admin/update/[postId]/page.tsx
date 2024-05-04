'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import PostForm from '@/components/Form/PostForm';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';

const UpdatePostPage = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<PostDataType | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

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
    const fetchPost = async () => {
      const res = await clientComponentFetch(
        BACKEND_ROUTES.POST_ID(params.postId)
      );
      setPost(res.data);
    };

    fetchPost();
  }, [params.postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <PostForm post={post} />
    </>
  );
};

export default UpdatePostPage;
