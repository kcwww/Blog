import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { ORIGIN } from '@/constants/url';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import { PostDataType } from '@/lib/types/PostType';
import Introduce from '@/components/Main/Introduce';
import PostContent from '@/components/Post/PostContent';

export const generateMetadata = async (
  {
    params,
  }: {
    params: { postId: string };
  },
  parent: ResolvingMetadata
) => {
  const id = params.postId;
  const data = await getPostData(params.postId);
  const previoutParent = await parent;
  const previousTitle = previoutParent.title?.absolute;
  const previoutDescription = previoutParent.description;
  const previousImages = previoutParent.openGraph?.images || [];

  return {
    title: `${data ? data.title : previousTitle}`,
    description: `${data ? data.content.slice(0, 100) + '...' : previoutDescription}`,
    alternate: {
      canonical: `${ORIGIN}/${id}`,
    },
    openGraph: {
      images: [
        ...previousImages,
        {
          url: data ? data.thumbnail : '',
          width: 800,
          height: 600,
          alt: data ? data.title : '',
        },
      ],
      title: `${data ? data.title : previousTitle}`,
      description: `${data ? data.content.slice(0, 100) + '...' : previoutDescription}`,
      url:
        `${ORIGIN}` +
        ROUTES.TYPE_TO_POST(
          data?.post?.type || '',
          data?.post?.name || '',
          data?.id || ''
        ),
    },
  } as Metadata;
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
      <div className="animate-fade-in-delay opacity-0 w-full h-full">
        <PostContent markedString={data ? data.content : ''} />
      </div>
    </>
  );
};

export default PostPage;
