import PostForm from '@/components/Form/PostForm';
import { BACKEND_ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import CheckAuth from '@/app/(protected)/admin/_components/CheckAuth';

const fetchPost = async (params: { postId: string }) => {
  const res = await serverComponentFetch(BACKEND_ROUTES.POST_ID(params.postId));
  return res.data;
};

const UpdatePostPage = async ({ params }: { params: { postId: string } }) => {
  const post = (await fetchPost(params)) as PostDataType;

  return (
    <CheckAuth>
      <PostForm post={post} />
    </CheckAuth>
  );
};

export default UpdatePostPage;
