'use client';

import Image from 'next/image';
import { Calendar } from 'lucide-react';

import { cn } from '@/lib/utils';
import { RecievedPostType } from '@/lib/types/PostType';
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

const PostCard = (post: RecievedPostType) => {
  return (
    <Card
      className={cn(
        'flex flex-col gap-2 max-h-[24rem] justify-between hover:scale-105 transition-transform',
        'animate-card-enter opacity-0'
      )}
      style={{ animationDelay: `${post.index * 100}ms` }}
    >
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="flex gap-2 text-sm items-center">
          <Calendar size={'1rem'} />
          {post.createdAt}
        </CardDescription>
      </CardHeader>
      {post.thumbnail && (
        <CardContent className="px-4 pb-4">
          <AspectRatio ratio={16 / 9}>
            <Image
              className="rounded-lg"
              src={post.thumbnail}
              alt={post.title}
              fill
            />
          </AspectRatio>
        </CardContent>
      )}
      {post.tags ? (
        <CardFooter className="flex gap-2">
          {post.tags.map((tag) => (
            <Badge className="cursor-pointer" key={tag}>
              {tag}
            </Badge>
          ))}
        </CardFooter>
      ) : (
        <div />
      )}
    </Card>
  );
};

export default PostCard;
