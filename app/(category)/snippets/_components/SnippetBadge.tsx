import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';

const SnippetBadge = ({
  name,
  count,
  selected,
  title,
}: {
  name: string;
  count: number;
  selected: string | null;
  title: string;
}) => {
  return (
    <Link href={ROUTES.SNIPPETS + `?key=${name}`}>
      <Badge
        variant={selected === name ? 'default' : 'secondary'}
        className="flex gap-2 text-md items-end"
      >
        {title}
        <p className="text-[0.7rem]">({count})</p>
      </Badge>
    </Link>
  );
};

export default SnippetBadge;
