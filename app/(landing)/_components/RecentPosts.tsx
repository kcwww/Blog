import Link from 'next/link';
import { Milestone } from 'lucide-react';

import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import PostCard from '@/components/Post/PostCard';
import { ReceivedPostDataType } from '@/lib/types/PostType';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { redirect } from 'next/navigation';

const fetchPostsData = async () => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.RECENT);
    return res;
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const RecentPosts = async () => {
  const result = await fetchPostsData();
  const data = result.posts;

  return (
    <div className="w-full">
      <h1 className="mb-8 flex animate-fade-in justify-center text-2xl opacity-0 md:justify-start ">
        Featured Posts
      </h1>
      <div className="flex w-full items-center justify-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:gap-12">
          {data.map((post: ReceivedPostDataType, index: number) => {
            post.index = index;
            return <PostCard key={post.id} {...post} />;
          })}
        </div>
      </div>
      <Link
        className="mt-4 flex w-fit animate-fade-in items-center gap-2 rounded-md p-2 opacity-0 transition-colors ease-out hover:bg-gray-300 dark:hover:bg-gray-800"
        href={ROUTES.POSTS}
      >
        <Milestone size={'1rem'} />
        view all posts...
      </Link>
    </div>
  );
};

export default RecentPosts;
