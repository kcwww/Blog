import Introduce from '@/app/(landing)/_components/Introduce';
import RecentPosts from '@/app/(landing)/_components/RecentPosts';

const MainSection = () => {
  return (
    <>
      <Introduce />
      <div className="w-full flex justify-center items-center">
        <RecentPosts />
      </div>
    </>
  );
};

export default MainSection;
