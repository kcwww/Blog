'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { ClipboardCopy } from 'lucide-react';

import { Button } from '@/components/ui/button';

const PostContent = ({ markedString }: { markedString: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <div className="relative w-full">
              <div className="absolute top-2 w-full px-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="bg-red-700 p-2 rounded-full" />
                    <div className=" bg-yellow-700 p-2 rounded-full" />
                    <div className=" bg-green-700 p-2 rounded-full" />
                  </div>

                  <div className="hidden md:block text-gray-100 top-3">
                    {match[1]}
                  </div>

                  <Button className="ml-auto md:ml-0 text-gray-100 top-3 w-7 h-7 p-0 bg-transparent">
                    <ClipboardCopy size={'1.5rem'} />
                  </Button>
                </div>
              </div>

              <SyntaxHighlighter
                language={match[1]}
                {...props}
                style={oneDark}
                customStyle={{
                  padding: '1.5rem',
                  borderRadius: '10px',
                  paddingTop: '3rem',
                  width: '100%',
                }}
                component="pre"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...props}>{children}</code>
          );
        },
        img: (image) => (
          <Image
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={300}
          />
        ),
      }}
    >
      {markedString}
    </ReactMarkdown>
  );
};
export default PostContent;
