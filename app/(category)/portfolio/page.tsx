import { redirect } from 'next/navigation';

import Introduce from '@/components/Main/Introduce';

const PortfolioPage = () => {
  const title = 'Portfolio';
  const description = [
    '현재까지 진행한 프로젝트를 소개하는 페이지입니다.',
    '프로젝트의 상세 내용과 소스코드를 확인하실 수 있습니다.',
  ];

  redirect('https://bit.ly/3wVaQjS'); //temp

  return (
    <>
      <Introduce title={title} description={description} />
    </>
  );
};

export default PortfolioPage;
