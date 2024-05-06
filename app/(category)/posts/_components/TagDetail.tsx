'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { ReceivedTagType } from '@/lib/types/TagType';
import Introduce from '@/components/Main/Introduce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const TagDetail = ({ detail }: { detail: string }) => {
  const router = useRouter();
  const [data, setData] = useState<ReceivedTagType | null>(null);

  useEffect(() => {
    const snippetDetailData = async (tagId: string) => {
      try {
        const res = await clientComponentFetch(BACKEND_ROUTES.TAG_ID(tagId));
        setData(res);
      } catch (error) {
        console.error(error);
        router.replace(ROUTES.NOT_FOUND);
      }
    };
    snippetDetailData(detail);
  }, [detail, router]);

  if (!data) return <></>;

  const dataDetail = data?.type;

  return (
    <>
      <Introduce title={dataDetail.id || ''} description={null} />
      <div className="animate-text-down-delay opacity-0 text-sm text-gray-300 dark:text-gray-500">
        총 {dataDetail?.posts.length} 개의 포스팅이 존재합니다.
      </div>
      {dataDetail.posts.map((post, index) => (
        <Link
          key={index}
          href={ROUTES.TYPE_TO_POST(
            post.post?.type || '',
            post.post?.name || '',
            post.id
          )}
          className="w-full hover:scale-105 transition-transform"
        >
          <Alert
            className={cn(
              'flex flex-col gap-4 sm:flex-row justify-between items-center',
              'animate-card-up opacity-0 relative'
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

export default TagDetail;
