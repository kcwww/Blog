'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

import CodeBlock from '@/components/ui/CodeBlock';

const PostContent = ({ markedString }: { markedString: string }) => {
  return (
    <ReactMarkdown
      className="marked-container flex flex-col gap-4 w-full"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
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
          <div className="flex justify-center items-center w-full">
            <Image
              src={image.src || ''}
              alt={image.alt || ''}
              width={500}
              height={300}
            />
          </div>
        ),
      }}
    >
      {markedString}
    </ReactMarkdown>
  );
};
export default PostContent;
