import { metadata as RootMetaData } from '@/app/layout';

import Introduce from '@/components/Main/Introduce';
import SeriesCards from '@/app/(category)/series/_components/SeriesCards';

export const dynamic = 'force-dynamic';

export const metadata = {
  ...RootMetaData,
  title: 'All Series',
  description: [
    '시리즈로 포스팅한 모든 게시글을 확인하실 수 있습니다.',
    '특정 주제로 연재되는 게시글을 이어 볼수 있도록 정리하고 있습니다.',
  ],
  openGraph: {
    ...RootMetaData.openGraph,
    title: 'All Series',
    description:
      '특정 주제로 연재되는 게시글을 이어 볼수 있도록 정리하고 있습니다.',
  },
};

const SeriesPage = () => {
  const title = 'All Series';
  const description = [
    '시리즈로 포스팅한 모든 게시글을 확인하실 수 있습니다.',
    '특정 주제로 연재되는 게시글을 이어 볼수 있도록 정리하고 있습니다.',
  ];
  return (
    <>
      <Introduce title={title} description={description} />
      <SeriesCards />
    </>
  );
};

export default SeriesPage;
