'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Calendar, ScrollText } from 'lucide-react';

import {
  PostDataType,
  PostListType,
  ReceivedPostTypeDetail,
} from '@/lib/types/PostType';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';

type OtherPostsType = {
  message: string;
  type: Omit<ReceivedPostTypeDetail, 'type'>;
};

const OtherPosts = ({ post }: { post: PostDataType | null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [detail, setDetail] = useState({
    title: '',
    description: '',
    createdAt: '',
  });
  const [otherPosts, setOtherPosts] = useState<PostListType[] | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (otherPosts) return;
    const fetchOtherPostList = async (type: string, name: string) => {
      const url =
        type === 'series'
          ? BACKEND_ROUTES.SERIES_ID(name)
          : BACKEND_ROUTES.SNIPPETS_ID(name);
      try {
        const res = (await clientComponentFetch(url)) as OtherPostsType;
        const array = res.type.posts.sort((a, b) =>
          b.createdAt > a.createdAt ? -1 : 1
        );
        setDetail({
          title: res.type.title,
          description: res.type.description,
          createdAt: res.type.posts.slice(-1)[0].createdAt,
        });

        setOtherPosts(array);
      } catch (e) {
        console.error(e);
        setOtherPosts(null);
      }
    };

    if (isVisible) {
      fetchOtherPostList(post?.post?.type || '', post?.post?.name || '');
    }
  }, [isVisible]);

  return (
    <div
      className="dark:bg-gray-800 bg-gray-500 w-full p-4 rounded-2xl flex flex-col gap-2"
      ref={ref}
    >
      {isVisible ? (
        <>
          <div className="text-2xl font-semibold">{detail.title}</div>
          <div>{detail.description}</div>
          <div className="flex gap-2 items-center text-gray-600">
            last update : <Calendar size={'1rem'} />
            {detail.createdAt}
          </div>
          <div className="flex items-center gap-2">
            <ScrollText size={'1rem'} />
            {otherPosts &&
              otherPosts.findIndex((otherPost) => otherPost.id === post?.id) +
                1}{' '}
            / {otherPosts?.length}
          </div>
          {otherPosts?.map((otherPost, index) => {
            if (otherPost.id === post?.id)
              return (
                <div
                  key={otherPost.id}
                  className="dark:text-gray-500 text-gray-300"
                >
                  {index + 1 + '. '}
                  {otherPost.title}
                </div>
              );
            return (
              <Link
                href={ROUTES.TYPE_TO_POST(
                  post?.post?.type || '',
                  post?.post?.name || '',
                  otherPost.id
                )}
                key={otherPost.id}
              >
                {index + 1 + '. '}
                {otherPost.title}
              </Link>
            );
          })}
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default OtherPosts;
