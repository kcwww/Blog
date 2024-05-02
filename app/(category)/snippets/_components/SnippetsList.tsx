import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import { ReceivedPostTypeDetail } from '@/lib/types/PostType';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/constants/routes';

const SnippetsList = ({
  param,
  snippets,
}: {
  param: string | null;
  snippets: Omit<ReceivedPostTypeDetail, 'description' | 'type'>[];
}) => {
  const [selected, setSelected] = useState<
    Omit<ReceivedPostTypeDetail, 'description' | 'type'>[]
  >([]);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fadeRef.current) {
      fadeRef.current.classList.add('animate-fade-out');

      const id = setTimeout(() => {
        fadeRef.current?.classList.remove('animate-fade-out');
        void fadeRef.current?.offsetWidth;
        fadeRef.current?.classList.add('animate-fade-in-delay');
      }, 300);

      fadeRef.current.classList.remove('animate-fade-in-delay');
      void fadeRef.current.offsetWidth;
      fadeRef.current.classList.add('animate-fade-in-delay');
    }

    if (param) {
      const selectedSnippets = snippets.filter(
        (snippet) => snippet.id === param
      );
      setSelected(selectedSnippets);
    } else {
      setSelected(snippets);
    }

    return () => clearTimeout(id);
  }, [param]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-16">
      {selected.map((snippet) => (
        <div
          ref={fadeRef}
          className="hover:scale-105 transition-transform"
          key={snippet.id}
        >
          {snippet.posts.map((post, index) => (
            <Link
              key={index}
              href={ROUTES.TYPE_TO_POST('snippets', snippet.id, post.id)}
            >
              <Alert className={cn('flex flex-col gap-4')}>
                <div className="flex justify-between items-center">
                  <AlertTitle className="flex w-fit bg-gray-300 dark:bg-gray-700 p-2 rounded-xl">
                    {snippet.title}
                  </AlertTitle>
                  <p className="text-sm text-gray-400 dark:text-gray-600">
                    {post.createdAt}
                  </p>
                </div>

                <AlertDescription className="flex flex-col gap-2 justify-center items-start">
                  {post.title}
                </AlertDescription>
              </Alert>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SnippetsList;
