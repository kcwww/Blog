'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

import ProgressBar from '@/components/Main/ProgressBar';
import CodeBlock from '@/components/ui/CodeBlock';
import { Button } from '@/components/ui/button';
import useModal from '@/lib/hooks/useModal';

const PostContent = ({ markedString }: { markedString: string }) => {
  const { onOpen } = useModal();

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
              className="mt-4 rounded-md overflow-hidden ml-auto mr-auto my-4 cursor-pointer"
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
              <Button className="hover:scale-105 transition-transform">
                {link.children}
              </Button>
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
