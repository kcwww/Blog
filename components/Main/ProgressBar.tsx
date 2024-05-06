import { useState, useEffect } from 'react';

import { Progress } from '@/components/ui/progress';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const scrolled = (scrollPosition / (fullHeight - windowHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      setProgress(0);
    };
  }, []);

  return (
    <>
      <Progress
        className="fixed top-0 left-0 w-full rounded-none z-50 h-[0.7rem]"
        value={progress}
      />
    </>
  );
};

export default ProgressBar;
