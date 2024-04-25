import MainSection from '@/app/(landing)/_components/MainSection';
import SubSection from '@/app/(landing)/_components/SubSection';

const Home = () => {
  return (
    <div className="w-full flex gap-2 mt-4">
      <MainSection />
      <SubSection />
    </div>
  );
};

export default Home;
