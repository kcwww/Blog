import CommandBox from '@/components/Header/CommandBox';
import ToggleThemeButton from '@/components/Header/ToggleThemeButton';

const Header = () => {
  return (
    <div className="w-full flex gap-2 items-center">
      <ToggleThemeButton />
      <CommandBox />
    </div>
  );
};

export default Header;
