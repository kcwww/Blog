import { redirect } from 'next/navigation';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

import { ReceivedPostTypeDetail } from '@/lib/types/PostType';
import { ROUTES } from '@/constants/routes';
import PostLists from '@/app/(category)/posts/_components/PostLists';

const fetchPostType = async (type: string) => {
  try {
    if (type === 'series') {
      const postsRef = collection(BLOGDB, 'series');
      const q = query(postsRef);
      const querySnapshot = await getDocs(q);

      const series = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      series.sort((a, b) => (a.id > b.id ? 1 : -1));
      return series;
    } else {
      const postsRef = collection(BLOGDB, 'snippets');
      const q = query(postsRef, orderBy('posts', 'desc'));
      const querySnapshot = await getDocs(q);

      const snippets = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return snippets;
    }
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const PostsBox = async ({ type }: { type: string }) => {
  const postType = (await fetchPostType(type)) as ReceivedPostTypeDetail[];

  postType.sort((a, b) =>
    b.posts.slice(-1)[0].createdAt > a.posts.slice(-1)[0].createdAt ? 1 : -1
  );

  return (
    <div className="flex w-full animate-fade-in-delay flex-col gap-4 opacity-0">
      <div className="flex items-end gap-2 text-xl font-semibold">
        {type[0].toLocaleUpperCase() + type.slice(1)} Posts
        <p className="text-sm">({postType?.length})</p>
      </div>
      {postType.map((post) => (
        <PostLists key={post.id} {...post} type={type} />
      ))}
    </div>
  );
};

export default PostsBox;
