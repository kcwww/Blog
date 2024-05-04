import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import { ReceivedPostTypeDetail } from '@/lib/types/PostType';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/constants/routes';

import { ParsingDataType } from '@/app/(category)/snippets/_components/SnippetsBox';

const SnippetsList = ({ snippets }: { snippets: ParsingDataType[] }) => {
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    if (fadeRef.current) {
      fadeRef.current.classList.add('animate-fade-out');

      id = setTimeout(() => {
        fadeRef.current?.classList.remove('animate-fade-out');
        void fadeRef.current?.offsetWidth;
        fadeRef.current?.classList.add('animate-fade-in-delay');
      }, 300);

      fadeRef.current.classList.remove('animate-fade-in-delay');
      void fadeRef.current.offsetWidth;
      fadeRef.current.classList.add('animate-fade-in-delay');
    }

    return () => clearTimeout(id ? id : 0);
  }, [snippets]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-16">
      {snippets.map((snippet, index) => (
        <div
          ref={fadeRef}
          className="hover:scale-105 transition-transform"
          key={index}
        >
          <Link
            href={ROUTES.TYPE_TO_POST('snippets', snippet.id, snippet.post.id)}
          >
            <Alert className={cn('flex flex-col gap-4')}>
              <div className="flex justify-between items-center">
                <AlertTitle className="flex w-fit bg-gray-300 dark:bg-gray-700 p-2 rounded-xl">
                  {snippet.title}
                </AlertTitle>
                <p className="text-sm text-gray-400 dark:text-gray-600">
                  {snippet.post.createdAt}
                </p>
              </div>

              <AlertDescription className="flex flex-col gap-2 justify-center items-start">
                {snippet.post.title}
              </AlertDescription>
            </Alert>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SnippetsList;
