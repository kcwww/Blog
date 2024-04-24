import Navbar from '@/components/Header/Navbar';
import CommandBox from '@/components/Header/CommandBox';
import ToggleThemeButton from '@/components/Header/ToggleThemeButton';

const Header = () => {
  return (
    <header className="w-full flex gap-2">
      <Navbar />
      <div className="ml-auto flex w-fit gap-4 items-center bg-gray-400 dark:bg-gray-700 p-2 rounded-lg">
        <ToggleThemeButton />
        <CommandBox />
      </div>
    </header>
  );
};

export default Header;
