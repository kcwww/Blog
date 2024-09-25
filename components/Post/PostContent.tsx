'use client';

import { useEffect } from 'react';

import Markdown from '@/components/Post/Markdown';
import ProgressBar from '@/components/Main/ProgressBar';

const PostContent = ({ markedString }: { markedString: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <ProgressBar />
      <Markdown content={markedString} />
    </>
  );
};
export default PostContent;
