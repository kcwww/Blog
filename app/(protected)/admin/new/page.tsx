'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import PostForm from '@/components/Form/PostForm';

const AdminPostPage = () => {
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

  return (
    <>
      <PostForm post={null} />
    </>
  );
};

export default AdminPostPage;
