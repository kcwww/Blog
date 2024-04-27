import Introduce from '@/app/(landing)/_components/Introduce';
import RecentPosts from '@/app/(landing)/_components/RecentPosts';

const Home = async () => {
  return (
    <>
      <Introduce />
      <RecentPosts />
    </>
  );
};

export default Home;
