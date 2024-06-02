import { ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import SeriesDetail from '@/app/(category)/series/_components/SeriesDetail';
import { ROUTES } from '@/constants/routes';
import { ReceivedSeriesType } from '@/lib/types/PostType';
import { ORIGIN } from '@/constants/url';

const seriesDetailData = async (series: string) => {
  try {
    const postRef = doc(BLOGDB, 'series', series);

    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ReceivedSeriesType;
    } else {
      throw new Error('No Snippets found with ID: ' + series);
    }
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

export const generateMetadata = async (
  { params }: { params: { series: string } },
  parent: ResolvingMetadata
) => {
  const data = await seriesDetailData(params.series);

  const previousMetadata = await parent;

  return {
    ...previousMetadata,
    title: data.title,
    description: data.description,
    openGraph: {
      ...previousMetadata.openGraph,
      title: data.title,
      description: data.description,
      url: `${ORIGIN}${ROUTES.SERIES}/${params.series}`,
    },
  };
};

const SeriesDetailPage = async ({ params }: { params: { series: string } }) => {
  const data = (await seriesDetailData(params.series)) as ReceivedSeriesType;
  return (
    <>
      <SeriesDetail data={data} />
    </>
  );
};

export default SeriesDetailPage;
