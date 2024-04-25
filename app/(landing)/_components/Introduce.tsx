'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Introduce = () => {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log(session, status);

  return (
    <div className="">
      <h1>Introduce</h1>
      <p>Introduce content</p>
    </div>
  );
};

export default Introduce;
