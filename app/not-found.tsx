import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default async function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-16">
      <h2 className="text-2xl bold">404 - Page Not Found</h2>
      <p>데이터를 찾을 수 없습니다. 잘못된 접근입니다.</p>
      <p>
        <Link href="/">
          <Button>Go main</Button>
        </Link>
      </p>
    </div>
  );
}
