import { redirect } from 'next/navigation';

import SnippetDetail from '@/app/(category)/snippets/_components/SnippetDetail';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { ReceivedSnippetType } from '@/lib/types/PostType';
import { ResolvingMetadata } from 'next';
import { ORIGIN } from '@/constants/url';

const snippetDetailData = async (snippet: string) => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.SNIPPETS_ID(snippet));
    return res.type;
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
    description : `${data.title} 에 대한 포스팅입니다.`,
    openGraph: {
      ...previousMetadata.openGraph,
      title: data.title,
      description : `${data.title} 에 대한 포스팅입니다.`,
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
