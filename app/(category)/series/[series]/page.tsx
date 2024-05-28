import { ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

import SeriesDetail from '@/app/(category)/series/_components/SeriesDetail';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import { ReceivedSeriesType } from '@/lib/types/PostType';
import { ORIGIN } from '@/constants/url';

const seriesDetailData = async (series: string) => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.SERIES_ID(series));
    return res.type;
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
    description : data.description,
    openGraph: {
      ...previousMetadata.openGraph,
      title: data.title,
      description : data.description,
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
