import type { MetadataRoute } from 'next';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';
import { URL } from '@/constants/url';
import { PostDataType } from '@/lib/types/PostType';

const fetchPosts = async () => {
  try {
    const postsRef = collection(BLOGDB, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as PostDataType[];
    return posts;
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
      url: `${URL}/${post.post?.type}/${post.post?.name}/${post.id}`,
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
      url: `${URL}/series/${name}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  const snippetRoutes = Object.keys(types.snippets).map((name: string) => {
    return {
      url: `${URL}/snippets/${name}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  const typeRoutes = [...seriesRoutes, ...snippetRoutes];

  const tags: { [key: string]: boolean } = {};
  posts.forEach((post: PostDataType) => {
    if (post.post === null) return;
    post.tags.forEach((tag: string) => {
      tags[tag] = true;
    });
  });

  const tagRoutes = Object.keys(tags).map((tag: string) => {
    return {
      url: `${URL}/posts/${tag}`,
      lastModified: date,
      changeFrequency: 'weekly',
      priority: 0.4,
    };
  });

  const routes = [
    {
      url: `${URL}`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${URL}/series`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${URL}/snippets`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${URL}/posts`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  return [...routes, ...postRoutes, ...typeRoutes, ...tagRoutes];
};

export default sitemap;
