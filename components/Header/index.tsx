import Navbar from '@/components/Header/Navbar';
import CommandBox from '@/components/Header/CommandBox';
import ToggleThemeButton from '@/components/Header/ToggleThemeButton';

const Header = () => {
  return (
    <header className="w-full lg:w-2/3 2xl:w-1/2 flex flex-row md:flex-col xl:flex-row gap-2 py-16">
      <Navbar />
      <div className="ml-auto flex w-fit  gap-4 items-center justify-between bg-gray-300 dark:bg-gray-900 p-2 rounded-lg sm:px-4 shadow-main dark:shadow-darkMain">
        <div className="flex items-center gap-4">
          <ToggleThemeButton />
        </div>
        <div className="flex items-center gap-4">
          <CommandBox />
        </div>
      </div>
    </header>
  );
};

export default Header;
