import { ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';
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
    params: { postId: string };
  },
  parent: ResolvingMetadata
) => {
  const data = await getPostData(params.postId);

  if (!data) return null;

  return makeMetaData(data, parent);
};

const getPostData = async (id: string) => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.POST_ID(id));
    return res.data as PostDataType;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const PostPage = async ({
  params,
}: {
  params: { postId: string; snippet: string };
}) => {
  const id = params.postId;
  const data = await getPostData(id);

  if (data && data.post?.name !== params.snippet) {
    return notFound();
  }

  return (
    <>
      <Introduce title={data ? data.title : ''} description={null} />
      <PostInfo post={data} />
      <div className="animate-fade-in-delay opacity-0 w-full h-full">
        <PostContent markedString={data ? data.content : ''} />
      </div>
      <OtherPosts post={data} />
    </>
  );
};

export default PostPage;
