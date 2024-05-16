import { Calendar } from 'lucide-react';

import type { PostDataType } from '@/lib/types/PostType';

const PostInfo = ({ post }: { post: PostDataType | null }) => {
  if (!post) return <></>;

  return (
    <div className="flex animate-fade-in-delay gap-4 text-gray-500 opacity-0">
      <p className="flex items-center gap-2">
        <Calendar size={'1rem'} /> {post.createdAt}
      </p>
    </div>
  );
};

export default PostInfo;
