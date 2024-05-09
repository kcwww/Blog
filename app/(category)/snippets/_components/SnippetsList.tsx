import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/constants/routes';

import { ParsingDataType } from '@/app/(category)/snippets/_components/SnippetsBox';

const SnippetsList = ({ snippets }: { snippets: ParsingDataType[] }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-16">
      {snippets.map((snippet, index) => (
        <div className="hover:scale-105 transition-transform" key={index}>
          <Link
            href={ROUTES.TYPE_TO_POST('snippets', snippet.id, snippet.post.id)}
          >
            <Alert className={cn('flex flex-col gap-4')}>
              <div className="flex gap-2 justify-between items-center">
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
