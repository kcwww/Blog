import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { ReceivedTagType } from '@/lib/types/TagType';
import Introduce from '@/components/Main/Introduce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import BadgeTag from '@/app/(category)/posts/_components/BadgeTag';

const TagDetail = async ({ data }: { data: ReceivedTagType }) => {
  return (
    <>
      <Introduce title={data.id} description={null} />
      <div className="animate-text-down-delay text-sm text-gray-400 opacity-0 dark:text-gray-500">
        총 {data.posts.length} 개의 포스팅이 존재합니다.
      </div>
      {data.posts.map((post, index) => (
        <Link
          key={index}
          href={ROUTES.TYPE_TO_POST(
            post.post?.type || '',
            post.post?.name || '',
            post.id
          )}
          className="w-full transition-transform hover:scale-105"
        >
          <Alert
            className={cn(
              'flex flex-col items-center justify-between gap-4 sm:flex-row',
              'relative animate-card-up opacity-0'
            )}
            style={{ animationDelay: `${(index + 1) * 200}ms` }}
          >
            <AlertTitle>{post.title}</AlertTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <AlertDescription className="flex justify-center gap-1">
                <div className="grid grid-cols-2 gap-1">
                  {post.tags.map((tag) => (
                    <BadgeTag key={tag} tag={tag} />
                  ))}
                </div>
              </AlertDescription>
              <p className="drak:text-gray-700 text-sm text-gray-400">
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
