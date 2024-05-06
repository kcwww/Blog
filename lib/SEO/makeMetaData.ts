import { Metadata, ResolvingMetadata } from 'next';

import type { PostDataType } from '@/lib/types/PostType';
import { ROUTES } from '@/constants/routes';
import { ORIGIN } from '@/constants/url';

const cleanText = (markedString: string) => {
  return markedString
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/^> .*/gm, '')
    .replace(/^\|.*\|$/gm, '')
    .replace(/^-{3,}.*$/gm, '')
    .replace(/^#{1,6}\s.*/gm, '');
};

const makeMetaData = async (data: PostDataType, parent: ResolvingMetadata) => {
  const previoutParent = await parent;
  const previousTitle = previoutParent.title?.absolute;
  const previoutDescription = previoutParent.description;
  const previousImages = previoutParent.openGraph?.images || [];

  const url =
    `${ORIGIN}` +
    ROUTES.TYPE_TO_POST(
      data?.post?.type || '',
      data?.post?.name || '',
      data?.id || ''
    );

  const cleanContent = cleanText(data.content);

  return {
    title: `${data ? data.title : previousTitle}`,
    description: `${data ? cleanContent.slice(0, 100) + '...' : previoutDescription}`,
    alternate: {
      canonical: url,
    },
    openGraph: {
      images: [
        {
          url: data ? data.thumbnail : '',
          width: 800,
          height: 600,
          alt: data ? data.title : '',
        },
      ],
      title: `${data ? data.title : previousTitle}`,
      description: `${data ? cleanContent.slice(0, 100) + '...' : previoutDescription}`,
      url: url,
    },
  } as Metadata;
};

export default makeMetaData;
