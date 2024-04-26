import { useEffect } from 'react';
import hljs from 'highlight.js';
import { ClipboardCopy } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button } from '@/components/ui/button';

export interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock = ({ language, children, ...props }: CodeBlockProps) => {
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

          <Button className="ml-auto md:ml-0 text-gray-100 top-3 w-7 h-7 p-0 bg-transparent">
            <ClipboardCopy size={'1.5rem'} />
          </Button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
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
  );
};

export default CodeBlock;
