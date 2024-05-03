'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

import CodeBlock from '@/components/ui/CodeBlock';

const PostContent = ({ markedString }: { markedString: string }) => {
  return (
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
          <AspectRatio
            ratio={16 / 9}
            className="w-full flex justify-center items-center"
          >
            <Image
              className="mt-4 rounded-md overflow-hidden"
              src={image.src || ''}
              alt={image.alt || ''}
              width={560}
              height={360}
            />
          </AspectRatio>
        ),
      }}
    >
      {markedString}
    </ReactMarkdown>
  );
};
export default PostContent;
