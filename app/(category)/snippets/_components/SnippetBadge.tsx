import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';

const SnippetBadge = ({
  name,
  count,
  selected,
}: {
  name: string;
  count: number;
  selected: string | null;
}) => {
  return (
    <Link href={ROUTES.SNIPPETS + `?key=${name}`}>
      <Badge
        variant={selected === name ? 'default' : 'secondary'}
        className="flex gap-2 text-md items-end"
      >
        {name}
        <p className="text-[0.7rem]">({count})</p>
      </Badge>
    </Link>
  );
};

export default SnippetBadge;
