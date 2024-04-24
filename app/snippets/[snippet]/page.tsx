const SnippetDetailPage = ({ params }: { params: { snippet: string } }) => {
  return <div>{params.snippet}</div>;
};

export default SnippetDetailPage;
