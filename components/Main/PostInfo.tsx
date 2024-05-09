import { Calendar } from 'lucide-react';

import type { PostDataType } from '@/lib/types/PostType';

const PostInfo = ({ post }: { post: PostDataType | null }) => {
  if (!post) return <></>;

  return (
    <div className="flex gap-4 text-gray-500">
      <p>{post.post?.name}</p>
      <p className="flex gap-2 items-center">
        <Calendar size={'1rem'} /> {post.createdAt}
      </p>
    </div>
  );
};

export default PostInfo;
