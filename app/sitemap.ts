import type { MetadataRoute } from 'next';
import { ORIGIN } from '@/constants/url';
import { BACKEND_ROUTES } from '@/constants/routes';

import serverComponentFetch from '@/lib/fetch/serverComponentFetch';
import { PostDataType } from '@/lib/types/PostType';

const fetchPosts = async () => {
  try {
    const res = await serverComponentFetch(BACKEND_ROUTES.POSTS);
    return res.posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await fetchPosts();

  const postRoutes = posts.map((post: PostDataType) => {
    const date = new Date(post.createdAt);
    date.setHours(date.getHours() + 9);
    return {
      url: `${ORIGIN}/${post.post?.type}/${post.post?.name}/${post.id}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const date = new Date();
  date.setHours(date.getHours() + 9);

  const types: { [key: string]: { [key: string]: boolean } } = {};

  posts.forEach((post: PostDataType) => {
    if (post.post === null) return;

    if (types[post.post.type] === undefined) {
      types[post.post.type] = {};
    }

    types[post.post.type][post.post.name] = true;
  });

  const seriesRoutes = Object.keys(types.series).map((name: string) => {
    return {
      url: `${ORIGIN}/series/${name}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  const snippetRoutes = Object.keys(types.snippets).map((name: string) => {
    return {
      url: `${ORIGIN}/snippets/${name}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  const typeRoutes = [...seriesRoutes, ...snippetRoutes];

  const tags: { [key: string]: boolean } = {};
  posts.forEach((post: PostDataType) => {
    post.tags.forEach((tag: string) => {
      tags[tag] = true;
    });
  });

  const tagRoutes = Object.keys(tags).map((tag: string) => {
    return {
      url: `${ORIGIN}/posts/${tag}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.4,
    };
  });

  const routes = [
    {
      url: `${ORIGIN}`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${ORIGIN}/series`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${ORIGIN}/snippets`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${ORIGIN}/posts`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  return [...routes, ...postRoutes, ...typeRoutes, ...tagRoutes];
};

export default sitemap;
