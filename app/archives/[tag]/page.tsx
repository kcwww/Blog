const TagDetailPage = ({ params }: { params: { tagName: string } }) => {
  const tagName = params.tagName;
  return <div>{tagName}</div>;
};

export default TagDetailPage;
