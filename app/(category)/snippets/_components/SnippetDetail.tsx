import Link from 'next/link';
import { redirect } from 'next/navigation';

import { cn } from '@/lib/utils';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { ReceivedPostTypeDetail, ReceivedPostType } from '@/lib/types/PostType';
import Introduce from '@/components/Main/Introduce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import BadgeTag from '@/app/(category)/posts/_components/BadgeTag';

type ReceivedSeriesType = ReceivedPostType & {
  message: string;
  type: Omit<ReceivedPostTypeDetail, 'description'>;
};

const snippetDetailData = async (series: string) => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.SNIPPETS_ID(series));
    return res;
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const SnippetDetail = async ({ detail }: { detail: string }) => {
  const data = (await snippetDetailData(detail)) as ReceivedSeriesType;

  const dataDetail = data.type;
  dataDetail.posts.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return (
    <>
      <Introduce title={dataDetail?.title || ''} description={null} />
      <div className="animate-text-down-delay text-sm text-gray-300 opacity-0 dark:text-gray-500">
        총 {dataDetail?.posts.length} 개의 포스팅이 존재합니다.
      </div>
      {dataDetail?.posts.map((post, index) => (
        <Link
          key={post.id}
          href={ROUTES.TYPE_TO_POST('series', dataDetail.id || '', post.id)}
          className="w-full transition-transform hover:scale-105"
        >
          <Alert
            className={cn(
              'flex flex-col items-center justify-between gap-4 md:flex-row',
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
              <p className="drak:text-gray-700 flex flex-col items-center justify-center text-sm text-gray-400">
                {post.createdAt}
              </p>
            </div>
          </Alert>
        </Link>
      ))}
    </>
  );
};

export default SnippetDetail;
