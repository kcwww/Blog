import TagDetail from '@/app/(category)/posts/_components/TagDetail';

const TagDetailPage = ({ params }: { params: { tagName: string } }) => {
  return (
    <>
      <TagDetail detail={params.tagName} />
    </>
  );
};

export default TagDetailPage;
