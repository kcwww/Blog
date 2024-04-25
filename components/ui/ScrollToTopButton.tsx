'use client';

import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ScrollToTopButton = () => {
  return (
    <Button
      size="icon"
      className={cn(
        'fixed bottom-5 right-5 z-50',
        'rounded-2xl transition hover:-translate-y-1'
      )}
      onClick={scrollToTop}
    >
      <ArrowUp size={20} />
    </Button>
  );
};

const scrollToTop = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default ScrollToTopButton;
