import { ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import TagDetail from '@/app/(category)/posts/_components/TagDetail';
import { ROUTES } from '@/constants/routes';
import { ORIGIN } from '@/constants/url';
import type { ReceivedTagType } from '@/lib/types/TagType';

const tagDetailData = async (tagName: string) => {
  try {
    const postRef = doc(BLOGDB, 'tags', tagName);
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const tags = { id: docSnap.id, ...docSnap.data() };
      return tags;
    } else {
      throw new Error('No Snippets found with ID: ' + tagName);
    }
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

export const generateMetadata = async (
  { params }: { params: { tagName: string } },
  parent: ResolvingMetadata
) => {
  const data = (await tagDetailData(params.tagName)) as ReceivedTagType;
  const previousMetadata = await parent;

  return {
    ...previousMetadata,
    title: data.id,
    description: `${data.id} 에 대한 포스팅입니다.`,
    openGraph: {
      ...previousMetadata.openGraph,
      title: data.id,
      description: `${data.id} 에 대한 포스팅입니다.`,
      url: `${ORIGIN}${ROUTES.TAG(params.tagName)}`,
    },
  };
};

const TagDetailPage = async ({ params }: { params: { tagName: string } }) => {
  const data = (await tagDetailData(params.tagName)) as ReceivedTagType;
  return (
    <>
      <TagDetail data={data} />
    </>
  );
};

export default TagDetailPage;
