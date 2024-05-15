'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';
import { ReceivedSnippetType, PostListType } from '@/lib/types/PostType';

import SnippetBadge from '@/app/(category)/snippets/_components/SnippetBadge';
import SnippetsList from '@/app/(category)/snippets/_components/SnippetsList';

export type ParsingDataType = {
  id: string;
  post: PostListType;
  title: string;
};

const parsingSnippet = (
  seleted: string | null,
  snippets: ReceivedSnippetType[]
): ParsingDataType[] => {
  const result = [] as ParsingDataType[];
  snippets.forEach((item) => {
    item.posts.forEach((post) => {
      if (seleted && item.id !== seleted) return;
      result.push({ id: item.id, post, title: item.title });
    });
  });

  return result;
};

const SnippetsBox = ({
  data,
  selected,
}: {
  data: ReceivedSnippetType[];
  selected: string | null;
}) => {
  const total = data.reduce((acc, cur) => acc + cur.posts.length, 0);
  const router = useRouter();
  const [snippets, setSnippets] = useState<ParsingDataType[]>([]);

  useEffect(() => {
    setSnippets(parsingSnippet(selected, data));
  }, [selected, data]);

  return (
    <div className="flex w-full animate-fade-in-delay flex-col gap-4 opacity-0">
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selected === null ? 'default' : 'secondary'}
          className="text-md flex cursor-pointer items-end gap-2"
          onClick={() => {
            router.push(ROUTES.SNIPPETS);
            router.refresh();
          }}
        >
          All
          <p className="text-[0.7rem]">({total})</p>
        </Badge>
        {data.map((snippet: ReceivedSnippetType, index) => (
          <SnippetBadge
            key={index}
            name={snippet.id}
            title={snippet.title}
            count={snippet.posts.length}
            selected={selected}
          />
        ))}
      </div>
      <SnippetsList snippets={snippets || []} />
    </div>
  );
};

export default SnippetsBox;
