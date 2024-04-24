import { redirect } from 'next/navigation';

import { BACKEND_ORIGIN } from '@/constants/url';

const serverComponentFetch = async (url: string, init?: RequestInit) => {
  const defaultInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalInit = init ? { ...defaultInit, ...init } : defaultInit;

  try {
    const res = await fetch(BACKEND_ORIGIN + url, finalInit);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetching Error : ', error);
    redirect('/404');
  }
};

export default serverComponentFetch;
