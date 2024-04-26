import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const CodeBlock = ({
  className,
  match,
  children,
}: {
  className: string;
  match: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className={className}>
      <code className={`language-${match}`}>{children}</code>
    </pre>
  );
};

export default CodeBlock;
