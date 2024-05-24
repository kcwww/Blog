import Link from 'next/link';

import type { PostListType } from '@/lib/types/PostType';
import { ROUTES } from '@/constants/routes';

const PostLists = ({
  id,
  title,
  posts,
  type,
}: {
  id: string;
  title: string;
  type: string;
  posts: PostListType[];
}) => {
  posts.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  return (
    <div className="flex flex-col gap-3">
      <Link
        href={ROUTES.TYPE_TO(type, id)}
        className="flex items-end gap-1 font-medium"
      >
        {title} <p className="text-[0.7rem]">({posts.length})</p>
      </Link>
      <div className="flex flex-col gap-2 px-4">
        {posts.map((post, index) => (
          <Link key={index} href={ROUTES.TYPE_TO_POST(type, id, post.id)}>
            <div className="flex items-center gap-2">
              <p className="text-[0.8rem]">{post.createdAt.split(' ')[0]}</p>
              <p>{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostLists;
