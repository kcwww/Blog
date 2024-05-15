'use client';

import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';

const BadgeTag = ({ tag }: { tag: string }) => {
  const router = useRouter();

  return (
    <Badge
      className="flex w-full items-center justify-center whitespace-nowrap px-4"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(ROUTES.TAG(tag));
      }}
      key={tag}
    >
      {tag}
    </Badge>
  );
};

export default BadgeTag;
