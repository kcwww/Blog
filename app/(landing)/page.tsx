import Introduce from '@/components/Main/Introduce';

import RecentPosts from '@/app/(landing)/_components/RecentPosts';

const Home = async () => {
  const title = 'kcwww dev Blog';
  const description = [
    '안녕하세요, 사람들의 삶에 가치를 더하는 경험을 제공하고자 하는 개발자 김찬우입니다.',
    '사용자 중심의 디자인과 기술 구현을 통해 접근성이 높고, 긍정적인 사용자 경험을 만들어 나가고자 합니다.',
  ];
  return (
    <>
      <Introduce title={title} description={description} />
      <RecentPosts />
    </>
  );
};

export default Home;
