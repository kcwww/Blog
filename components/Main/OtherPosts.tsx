'use client';

import { useState, useEffect, useRef } from 'react';

const OtherPosts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setTimeout(() => setIsVisible(entry.isIntersecting), 3000);
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return <div ref={ref}>{isVisible ? 'otherPosts' : 'loading'}</div>;
};

export default OtherPosts;
