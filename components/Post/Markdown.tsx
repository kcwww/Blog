'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

import { cn } from '@/lib/utils';
import CodeBlock from '@/components/ui/CodeBlock';
import { Button } from '@/components/ui/button';
import { inter } from '@/lib/fonts';
import useModal from '@/lib/hooks/useModal';

const Markdown = ({ content }: { content: string }) => {
  const { onOpen } = useModal();

  return (
    <ReactMarkdown
      className="marked-container mb-20 flex w-full flex-col gap-4"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <CodeBlock language={match[1]} {...props}>
              {String(children)}
            </CodeBlock>
          ) : (
            <code
              className={cn(
                'break-words rounded-md bg-gray-300 p-1 text-red-400',
                inter.className
              )}
            >
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image
            className="my-4 ml-auto mr-auto mt-4 cursor-pointer overflow-hidden rounded-md"
            src={image.src || ''}
            alt={image.alt || ''}
            width={1920}
            height={1080}
            quality={100}
            onClick={() => onOpen('Image', { data: image.src })}
          />
        ),
        a: (link) => (
          <Link href={link.href || '#'} target="_blank">
            <Button className="transition-transform hover:scale-105">
              {link.children}
            </Button>
          </Link>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
