'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ReceivedPostDataType } from '@/lib/types/PostType';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ROUTES } from '@/constants/routes';

const PostCard = (data: ReceivedPostDataType) => {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();
  const post = data.post;

  useEffect(() => {
    const id = setTimeout(() => {
      setAnimate(true);
    }, 1200);

    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <Link
      href={post ? ROUTES.TYPE_TO_POST(post.type, post.name, data.id) : data.id}
    >
      <Card
        className={cn(
          'flex flex-col gap-2  justify-between hover:scale-105 transition-transform h-full',
          !animate && 'animate-card-enter opacity-0'
        )}
        style={{ animationDelay: `${data.index * 100}ms` }}
      >
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>{data.title}</CardTitle>
          <CardDescription className="flex gap-2 text-sm items-center">
            <Calendar size={'1rem'} />
            {data.createdAt}
          </CardDescription>
        </CardHeader>
        {data.thumbnail && (
          <CardContent className="px-4 pb-4">
            <AspectRatio ratio={16 / 9}>
              <Image
                className="rounded-lg"
                src={data.thumbnail}
                alt={data.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </AspectRatio>
          </CardContent>
        )}
        {data.tags ? (
          <CardFooter className="flex gap-2">
            {data.tags.map((tag) => (
              <Badge
                onClick={(event) => {
                  event.preventDefault();
                  router.push(ROUTES.TAG(tag));
                }}
                key={tag}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </CardFooter>
        ) : (
          <div />
        )}
      </Card>
    </Link>
  );
};

export default PostCard;
