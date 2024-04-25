'use client';

import { useState, useEffect, use } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';

const AdminPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push(BACKEND_ROUTES.LOGIN);

    if (session?.user?.email !== process.env.NEXT_PUBLIC_ACCOUNT) {
      toast.error('권한이 없습니다.');
      signOut({ redirect: false });
      router.replace(ROUTES.LANDING);
    }
  }, [status, session]);

  if (!isMounted) return null;
  if (status === 'loading') return null;

  return (
    <div className="">
      <h1>Admin Page</h1>
      <p>Admin content</p>
    </div>
  );
};

export default AdminPage;
