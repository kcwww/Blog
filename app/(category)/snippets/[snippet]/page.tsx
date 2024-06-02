import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import SnippetDetail from '@/app/(category)/snippets/_components/SnippetDetail';
import type { PostDataType } from '@/lib/types/PostType';
import { ROUTES } from '@/constants/routes';
import { ReceivedSnippetType } from '@/lib/types/PostType';
import { ResolvingMetadata } from 'next';
import { ORIGIN } from '@/constants/url';

const snippetDetailData = async (snippet: string) => {
  try {
    const postRef = doc(BLOGDB, 'snippets', snippet);

    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PostDataType;
    } else {
      throw new Error('No Snippets found with ID: ' + snippet);
    }
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

export const generateMetadata = async (
  { params }: { params: { snippet: string } },
  parent: ResolvingMetadata
) => {
  const data = await snippetDetailData(params.snippet);
  const previousMetadata = await parent;

  return {
    ...previousMetadata,
    title: data.title,
    description: `${data.title} 에 대한 포스팅입니다.`,
    openGraph: {
      ...previousMetadata.openGraph,
      title: data.title,
      description: `${data.title} 에 대한 포스팅입니다.`,
      url: `${ORIGIN}${ROUTES.SNIPPETS}/${params.snippet}`,
    },
  };
};

const SnippetDetailPage = async ({
  params,
}: {
  params: { snippet: string };
}) => {
  const data = (await snippetDetailData(params.snippet)) as ReceivedSnippetType;

  return (
    <>
      <SnippetDetail data={data} />
    </>
  );
};

export default SnippetDetailPage;
