import Introduce from '@/components/Main/Introduce';

import SnippetsBox from '@/app/(category)/snippets/_components/SnippetsBox';

const SnippetsPage = () => {
  const title = 'All Snippets';
  const description = [
    '개발하면서 유용하게 사용할 수 있는 코드 스니펫을 정리하고 있습니다.',
  ];

  return (
    <>
      <Introduce title={title} description={description} />
      <SnippetsBox />
    </>
  );
};

export default SnippetsPage;
