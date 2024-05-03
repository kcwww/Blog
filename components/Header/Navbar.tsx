import Sidebar from '@/components/Header/Sidebar';
import Links from '@/components/Header/Links';

const Navbar = () => {
  return (
    <>
      <div className="w-full md:block hidden">
        <Links view={undefined} />
      </div>
      <div className="md:hidden flex items-center">
        <Sidebar />
      </div>
    </>
  );
};

export default Navbar;
