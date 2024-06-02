import Link from 'next/link';
import { redirect } from 'next/navigation';
import { collection, query, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ROUTES } from '@/constants/routes';
import type { ReceivedPostTypeDetail } from '@/lib/types/PostType';

const fetchSeries = async () => {
  try {
    const postsRef = collection(BLOGDB, 'series');
    const q = query(postsRef);
    const querySnapshot = await getDocs(q);

    const series = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    series.sort((a, b) => (a.id > b.id ? 1 : -1));
    return series;
  } catch (error) {
    console.error(error);
    redirect(ROUTES.NOT_FOUND);
  }
};

const SeriesCards = async () => {
  const series = (await fetchSeries()) as ReceivedPostTypeDetail[];

  series.sort((a, b) =>
    b.posts.slice(-1)[0].createdAt > a.posts.slice(-1)[0].createdAt ? 1 : -1
  );

  return (
    <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2 2xl:grid-cols-3">
      {series.map((series, index) => (
        <Link
          key={index}
          className="transition-transform hover:scale-105"
          href={ROUTES.TYPE_TO('series', series.id)}
        >
          <Alert
            className={cn(
              'relative animate-card-up opacity-0',
              'flex h-full flex-col gap-4'
            )}
            style={{ animationDelay: `${(index + 1) * 200}ms` }}
          >
            <AlertTitle className="flex items-center justify-center leading-6">
              {series.title}
            </AlertTitle>
            <hr />
            <AlertDescription className="flex flex-col items-center justify-center gap-2">
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
