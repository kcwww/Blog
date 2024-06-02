import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import { ROUTES } from '@/constants/routes';
import PostForm from '@/components/Form/PostForm';
import type { PostDataType } from '@/lib/types/PostType';
import CheckAuth from '@/app/(protected)/admin/_components/CheckAuth';
import DeletePost from '@/app/(protected)/admin/_components/DeletePost';

const fetchPost = async (params: { postId: string }) => {
  const id = params.postId;

  try {
    const postRef = doc(BLOGDB, 'posts', id);
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PostDataType;
    } else {
      throw new Error('No Snippets found with ID: ' + id);
    }
  } catch (e) {
    console.error(e);
    redirect(ROUTES.NOT_FOUND);
  }
};

const UpdatePostPage = async ({ params }: { params: { postId: string } }) => {
  const post = (await fetchPost(params)) as PostDataType;

  return (
    <CheckAuth>
      <PostForm post={post} />
      <DeletePost id={params.postId} />
    </CheckAuth>
  );
};

export default UpdatePostPage;
