import { redirect } from 'next/navigation';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import Introduce from '@/components/Main/Introduce';
import SnippetsBox from '@/app/(category)/snippets/_components/SnippetsBox';
import type { ReceivedSnippetType } from '@/lib/types/PostType';
import { ROUTES } from '@/constants/routes';
import { metadata as RootMetaData } from '@/app/layout';

export const metadata = {
  ...RootMetaData,
  title: 'All Snippets',
  description: [
    '개발하면서 유용하게 사용할 수 있는 코드 스니펫을 정리하고 있습니다.',
  ],
  openGraph: {
    ...RootMetaData.openGraph,
    title: 'All Snippets',
    description:
      '개발하면서 유용하게 사용할 수 있는 코드 스니펫을 정리하고 있습니다.',
  },
};

const fetchSnippets = async () => {
  try {
    const postsRef = collection(BLOGDB, 'snippets');
    const q = query(postsRef, orderBy('posts', 'desc'));
    const querySnapshot = await getDocs(q);

    const snippets = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as ReceivedSnippetType[];
    snippets.sort(
      (a: ReceivedSnippetType, b: ReceivedSnippetType) =>
        b.posts.length - a.posts.length
    );
    return snippets;
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
