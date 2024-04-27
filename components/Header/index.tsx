import Navbar from '@/components/Header/Navbar';
import CommandBox from '@/components/Header/CommandBox';
import ToggleThemeButton from '@/components/Header/ToggleThemeButton';

const Header = () => {
  return (
    <header className="w-full flex gap-2 py-16">
      <Navbar />
      <div className="ml-auto flex w-fit md:min-w-[21rem] gap-4 items-center justify-between bg-gray-400 dark:bg-gray-700 p-2 rounded-lg sm:px-4">
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
