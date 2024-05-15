import Introduce from '@/components/Main/Introduce';

import SnippetsBox from '@/app/(category)/snippets/_components/SnippetsBox';
import { redirect } from 'next/navigation';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import type { ReceivedSnippetType } from '@/lib/types/PostType';
import { ROUTES, BACKEND_ROUTES } from '@/constants/routes';

const fetchSnippets = async () => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.SNIPPETS);
    res.type.sort(
      (a: ReceivedSnippetType, b: ReceivedSnippetType) =>
        b.posts.length - a.posts.length
    );
    return res.type;
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const SnippetsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const title = 'All Snippets';
  const description = [
    '개발하면서 유용하게 사용할 수 있는 코드 스니펫을 정리하고 있습니다.',
  ];

  const data = await fetchSnippets();
  const value = searchParams.key ? searchParams.key : null;

  return (
    <>
      <Introduce title={title} description={description} />
      <SnippetsBox data={data} selected={value} />
    </>
  );
};

export default SnippetsPage;
