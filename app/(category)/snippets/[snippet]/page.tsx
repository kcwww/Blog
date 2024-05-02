import SnippetDetail from '@/app/(category)/snippets/_components/SnippetDetail';

const SnippetDetailPage = ({ params }: { params: { snippet: string } }) => {
  return (
    <>
      <SnippetDetail detail={params.snippet} />
    </>
  );
};

export default SnippetDetailPage;
