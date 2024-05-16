'use client';

import { useEffect, useState } from 'react';

import ImageModal from '@/components/Modal/ImageModal';
import DeleteModal from '@/app/(protected)/admin/_components/DeleteModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ImageModal />
      <DeleteModal />
    </>
  );
};

export default ModalProvider;
