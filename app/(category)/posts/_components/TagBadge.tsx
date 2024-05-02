import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

const TagBadge = ({ name, count }: { name: string; count: number }) => {
  return (
    <Link href={`/posts/${name}`}>
      <Badge variant="secondary" className="flex gap-2 text-md items-end">
        {name}
        <p className="text-[0.7rem]">({count})</p>
      </Badge>
    </Link>
  );
};

export default TagBadge;
