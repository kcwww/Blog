import { RecievedPostType } from '@/lib/types/PostType';
import PostContent from '@/components/Post/PostContent';

const PostCard = (post: RecievedPostType) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <PostContent markedString={post.content} />
      <p>{post.tags}</p>
      <p>{post.thumbnail}</p>
      <p>{post.createdAt}</p>
    </div>
  );
};

export default PostCard;
