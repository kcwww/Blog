import { ResolvingMetadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import { PostDataType } from '@/lib/types/PostType';
import Introduce from '@/components/Main/Introduce';
import PostContent from '@/components/Post/PostContent';
import makeMetaData from '@/lib/SEO/makeMetaData';
import PostInfo from '@/components/Main/PostInfo';
import OtherPosts from '@/components/Main/OtherPosts';

export const generateMetadata = async (
  {
    params,
  }: {
    params: { postId: string; series: string };
  },
  parent: ResolvingMetadata
) => {
  const data = await getPostData(params.postId);

  if (!data) return null;
  return makeMetaData(data, parent);
};

const getPostData = async (id: string) => {
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
    return null;
  }
};

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const id = params.postId;
  const data = await getPostData(id);

  return (
    <>
      <Introduce title={data ? data.title : ''} description={null} />
      <PostInfo post={data} />
      <div className="h-full w-full animate-fade-in-delay opacity-0">
        <PostContent markedString={data ? data.content : ''} />
      </div>
      <OtherPosts post={data} />
    </>
  );
};

export default PostPage;
