import { Metadata, ResolvingMetadata } from 'next';

import { ORIGIN } from '@/constants/url';

export const generateMetadata = async (
  {
    params,
  }: {
    params: { postId: string };
  },
  parent: ResolvingMetadata
) => {
  const id = params.postId;
  const previousTitle = (await parent).title?.absolute;

  return {
    title: `Post ${id} | ${previousTitle}`,
    description: `Post ${id}`,
    alternate: {
      canonical: `${ORIGIN}/${id}`,
    },
  } as Metadata;
};

const PostPage = ({ params }: { params: { postId: string } }) => {
  const id = params.postId;
  return <main className="">{id}</main>;
};

export default PostPage;
