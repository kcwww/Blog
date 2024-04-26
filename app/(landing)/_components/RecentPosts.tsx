'use client';

import { useQuery } from '@tanstack/react-query';

import clientComponentFetch from '@/lib/fetch/clientComponentFetch';

const fetchPostsData = async () => {
  try {
    const res = await clientComponentFetch('/api/posts');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const RecentPosts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: 'posts',
    queryFn: fetchPostsData,
  });

  return (
    <div>
      <h1>Recent Posts</h1>
      <p>Recent Posts content</p>
    </div>
  );
};

export default RecentPosts;
