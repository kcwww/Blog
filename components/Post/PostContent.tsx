'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

import ProgressBar from '@/components/Main/ProgressBar';
import CodeBlock from '@/components/ui/CodeBlock';
import { Button } from '@/components/ui/button';

const PostContent = ({ markedString }: { markedString: string }) => {
  return (
    <>
      <ProgressBar />
      <ReactMarkdown
        className="marked-container flex flex-col w-full mb-20 gap-4"
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <CodeBlock language={match[1]} {...props}>
                {String(children)}
              </CodeBlock>
            ) : (
              <code className="bg-gray-300 text-red-400 p-1 rounded-md">
                {children}
              </code>
            );
          },
          img: (image) => (
            <Image
              className="mt-4 rounded-md overflow-hidden ml-auto mr-auto my-4"
              src={image.src || ''}
              alt={image.alt || ''}
              width={560}
              height={315}
              objectFit="cover"
              quality={100}
            />
          ),
          a: (link) => (
            <Link href={link.href || '#'} target="_blank">
              <Button>{link.children}</Button>
            </Link>
          ),
        }}
      >
        {markedString}
      </ReactMarkdown>
    </>
  );
};
export default PostContent;
