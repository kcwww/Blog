'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { ReceivedPostTypeDetail } from '@/lib/types/PostType';
import Introduce from '@/components/Main/Introduce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

type ReceivedSeriesType = ReceivedPostTypeDetail & {
  message: string;
  type: ReceivedPostTypeDetail;
};

const seriesDetailData = async (
  series: string
): Promise<ReceivedSeriesType | null> => {
  try {
    const res = await clientComponentFetch(BACKEND_ROUTES.SERIES_ID(series));
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const SeriesDetail = ({ detail }: { detail: string }) => {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['seriesDetail'],
    queryFn: () => seriesDetailData(detail),
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
  if (isError) return <p>fetch error series</p>;

  const dataDetail = data?.type;

  return (
    <>
      <Introduce
        title={dataDetail?.title || ''}
        description={[dataDetail?.description || '']}
      />
      {dataDetail?.posts.map((post, index) => (
        <Link
          key={post.id}
          href={ROUTES.TYPE_TO_POST('series', dataDetail.id || '', post.id)}
          className="w-full hover:scale-105 transition-transform"
        >
          <Alert
            className={cn(
              'flex flex-col gap-4 sm:flex-row justify-between items-center',
              !animate && 'animate-card-up opacity-0 relative'
            )}
            style={{ animationDelay: `${(index + 1) * 200}ms` }}
          >
            <AlertTitle>{post.title}</AlertTitle>
            <div className="flex gap-2 sm:flex-row flex-col">
              <AlertDescription className="flex gap-1 justify-center">
                {post.tags.map((tag) => (
                  <Badge
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(ROUTES.TAG(tag));
                    }}
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </AlertDescription>
              <p className="text-sm text-gray-400 drak:text-gray-700">
                {post.createdAt}
              </p>
            </div>
          </Alert>
        </Link>
      ))}
    </>
  );
};

export default SeriesDetail;
