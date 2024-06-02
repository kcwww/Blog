import Link from 'next/link';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';
import DataTable from '@/components/Post/DataTable';
import CheckAuth from '@/app/(protected)/admin/_components/CheckAuth';

export type DataTableType = Omit<PostDataType, 'post'> & {
  title: string;
  createdAt: string;
  type: string;
  name: string;
  id: string;
};

const fetchAllPosts = async () => {
  const postsRef = collection(BLOGDB, 'posts');
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as PostDataType[];
  const posts = results.map((post: PostDataType) => {
    const obj = {
      title: post.title,
      createdAt: post.createdAt,
      type: post.post?.type || '',
      name: post.post?.name || '',
      id: post.id,
    };
    return obj;
  }) as DataTableType[];

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
