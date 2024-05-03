'use client';

import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';
import { ReceivedPostType, ReceivedPostTypeDetail } from '@/lib/types/PostType';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';

import SnippetBadge from '@/app/(category)/snippets/_components/SnippetBadge';
import SnippetsList from '@/app/(category)/snippets/_components/SnippetsList';

export type ReceiveSnippetType = ReceivedPostType & {
  type: Omit<ReceivedPostTypeDetail, 'description' | 'type'>[];
};

const SnippetsBox = () => {
  const searchParams = useSearchParams();
  const selected = searchParams.get('key');
  const [data, setData] = useState<ReceiveSnippetType | null>(null);

  useEffect(() => {
    const fetchSnippets = async (value: string | null) => {
      const url = value
        ? `${BACKEND_ROUTES.SNIPPETS}?key=${value}`
        : BACKEND_ROUTES.SNIPPETS;
      try {
        const res = await clientComponentFetch(url);
        setData(res);
      } catch (error) {
        console.error(error);
        setData(notFound());
      }
    };
    fetchSnippets(selected);
  }, [selected]);

  if (!data) return <></>;

  const snippets = data?.type;
  const total =
    snippets?.reduce((acc, curr) => acc + curr.posts.length, 0) || 0;

  const flag = snippets?.filter((snippet) => snippet.id === selected) || [];
  if (selected && !flag.length) return notFound();

  snippets?.sort((a, b) => b.posts.length - a.posts.length);

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in-delay opacity-0">
      <div className="flex flex-wrap gap-2">
        <Link href={ROUTES.SNIPPETS}>
          <Badge
            variant={selected === null ? 'default' : 'secondary'}
            className="flex gap-2 text-md items-end"
          >
            All
            <p className="text-[0.7rem]">({total})</p>
          </Badge>
        </Link>
        {snippets?.map((snippet) => (
          <SnippetBadge
            key={snippet.id}
            name={snippet.id}
            title={snippet.title}
            count={snippet.posts.length}
            selected={selected}
          />
        ))}
      </div>
      <SnippetsList param={selected} snippets={snippets || []} />
    </div>
  );
};

export default SnippetsBox;
