import Image from 'next/image';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Links from '@/components/Header/Links';

const SHEET_SIDES = 'left' as const;

type SheetSide = typeof SHEET_SIDES;

const Sidebar = () => {
  const side = 'left' as SheetSide;

  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Button className="bg-transparent text-gray-800 hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side={side} className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="flex justify-center">
            망그러진 블로그
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col w-full justify-center items-center">
          <Image
            src={`https://${process.env.AWS_CLOUDFRONT_DOMAIN}/main/main.png`}
            alt="Profile"
            width={200}
            height={200}
            className="rounded-full"
          />
          <p className="text-gray-500">망그러진 개발 생각들</p>
        </div>
        <Links view={'col'} />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
