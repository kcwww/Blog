'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { ReceivedPostType } from '@/lib/types/PostType';

const fetchSeries = async (): Promise<ReceivedPostType | null> => {
  try {
    const res = await clientComponentFetch(BACKEND_ROUTES.SERIES);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const SeriesCards = () => {
  const [animate, setAnimate] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['series'],
    queryFn: fetchSeries,
  });

  useEffect(() => {
    if (isLoading) return;

    const id = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  if (isLoading) return <></>;
  if (isError) return <p>fetch error post series</p>;

  const series = data?.type;

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
              !animate && 'animate-card-up opacity-0 relative',
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