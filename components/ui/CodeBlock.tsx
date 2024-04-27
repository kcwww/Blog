'use client';

import { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock = ({ language, children, ...props }: CodeBlockProps) => {
  const [animation, setAnimation] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnimationEnd = () => {
    setAnimation(false);
    setCopied(true);
  };

  const copyToClipboard = () => {
    setCopied(false);
    navigator.clipboard.writeText(children);
    setAnimation(true);
  };

  return (
    <div className="relative w-full">
      <div className="absolute top-2 w-full px-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="bg-red-700 p-2 rounded-full" />
            <div className=" bg-yellow-700 p-2 rounded-full" />
            <div className=" bg-green-700 p-2 rounded-full" />
          </div>

          <div className="hidden md:block text-gray-100 top-3">{language}</div>

          <Button
            onClick={() => copyToClipboard()}
            className={cn(
              'ml-auto md:ml-0 text-gray-100 top-3 w-7 h-7 p-0 bg-transparent',
              animation && 'animate-spin-once'
            )}
            onAnimationEnd={handleAnimationEnd}
          >
            {copied ? (
              <Check size={'1.5rem'} />
            ) : (
              <ClipboardCopy size={'1.5rem'} />
            )}
          </Button>
        </div>
      </div>

      <SyntaxHighlighter
        showLineNumbers={true}
        language={language}
        {...props}
        style={atomOneDark}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '10px',
          paddingTop: '3rem',
          width: '100%',
        }}
        component="pre"
      >
        {children.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
