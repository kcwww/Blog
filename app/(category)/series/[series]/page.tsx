import SeriesDetail from '@/app/(category)/series/_components/SeriesDetail';

const SeriesDetailPage = ({ params }: { params: { series: string } }) => {
  return (
    <>
      <SeriesDetail detail={params.series} />
    </>
  );
};

export default SeriesDetailPage;
