import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/constants/routes';

import { ParsingDataType } from '@/app/(category)/snippets/_components/SnippetsBox';

const SnippetsList = ({ snippets }: { snippets: ParsingDataType[] }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2">
      {snippets.map((snippet, index) => (
        <div className="transition-transform hover:scale-105" key={index}>
          <Link
            href={ROUTES.TYPE_TO_POST('snippets', snippet.id, snippet.post.id)}
          >
            <Alert className={cn('flex flex-col gap-4')}>
              <div className="flex items-center justify-between gap-2">
                <AlertTitle className="flex w-fit rounded-xl bg-gray-300 p-2 dark:bg-gray-700">
                  {snippet.title}
                </AlertTitle>
                <p className="text-sm text-gray-400 dark:text-gray-600">
                  {snippet.post.createdAt}
                </p>
              </div>

              <AlertDescription className="flex flex-col items-start justify-center gap-2">
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
