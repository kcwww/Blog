import { redirect } from 'next/navigation';
import { ReceivedPostType } from '@/lib/types/PostType';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';

import PostLists from '@/app/(category)/posts/_components/PostLists';

const fetchPostType = async (type: string) => {
  const url =
    type === 'series' ? BACKEND_ROUTES.SERIES : BACKEND_ROUTES.SNIPPETS;
  try {
    const res = await serverComponentFetch(url);
    return res;
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const PostsBox = async ({ type }: { type: string }) => {
  const data = (await fetchPostType(type)) as ReceivedPostType;
  const postType = data.type;

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
