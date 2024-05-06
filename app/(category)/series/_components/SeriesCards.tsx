'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { ReceivedPostType } from '@/lib/types/PostType';

const SeriesCards = () => {
  const [data, setData] = useState<ReceivedPostType | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await clientComponentFetch(BACKEND_ROUTES.SERIES);
        setData(res);
      } catch (error) {
        console.error(error);
        router.replace(ROUTES.NOT_FOUND);
      }
    };
    fetchSeries();
  }, [router]);

  if (!data) return <></>;

  const series = data?.type;
  series.sort((a, b) => (b.posts[0].createdAt > a.posts[0].createdAt ? 1 : -1));

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-16">
      {series?.map((series, index) => (
        <Link
          key={index}
          className="hover:scale-105 transition-transform"
          href={ROUTES.TYPE_TO('series', series.id)}
        >
          <Alert
            className={cn(
              'animate-card-up opacity-0 relative',
              'flex flex-col gap-4'
            )}
            style={{ animationDelay: `${(index + 1) * 200}ms` }}
          >
            <AlertTitle className="flex justify-center items-center">
              {series.title}
            </AlertTitle>
            <hr />
            <AlertDescription className="flex flex-col gap-2 justify-center items-center">
              {series.description}
              <p className="text-sm text-gray-300 dark:text-gray-700">
                {series.posts.length +
                  ' post' +
                  (series.posts.length !== 1 ? 's' : '')}
              </p>
            </AlertDescription>
          </Alert>
        </Link>
      ))}
    </div>
  );
};

export default SeriesCards;
