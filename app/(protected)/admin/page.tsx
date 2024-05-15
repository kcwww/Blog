import Link from 'next/link';

import { Button } from '@/components/ui/button';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';
import DataTable from '@/components/Post/DataTable';
import CheckAuth from '@/app/(protected)/admin/_components/CheckAuth';

export type DataTableType = Omit<PostDataType, 'post'> & {
  type: string;
  name: string;
  post?: {
    type: string;
    name: string;
  };
};

const fetchAllPosts = async () => {
  const res = await serverComponentFetch(BACKEND_ROUTES.POSTS);
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

  return posts;
};

const AdminPage = async () => {
  const posts = (await fetchAllPosts()) as DataTableType[];

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
