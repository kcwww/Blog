'use client';

import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';
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

const SnippetsBox = () => {
  const searchParams = useSearchParams();
  const selected = searchParams.get('key');
  const [snippets, setSnippets] = useState<ParsingDataType[] | null>(null);
  const [data, setData] = useState<ReceivedSnippetType[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSnippets = async (value: string | null) => {
      const url = value
        ? `${BACKEND_ROUTES.SNIPPETS}?key=${value}`
        : BACKEND_ROUTES.SNIPPETS;
      try {
        const res = await clientComponentFetch(url);
        res.type.sort(
          (a: ReceivedSnippetType, b: ReceivedSnippetType) =>
            b.posts.length - a.posts.length
        );
        const parsingData = parsingSnippet(value, res.type);

        setData(res.type);
        setSnippets(parsingData);
      } catch (error) {
        console.error(error);
        router.replace(ROUTES.NOT_FOUND);
      }
    };
    fetchSnippets(selected);
  }, [selected, router]);

  if (!snippets) return <></>;

  const total = data?.reduce((acc, cur) => acc + cur.posts.length, 0);

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
        {data?.map((snippet, index) => (
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
