import RSS from 'rss';

import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { URL } from '@/constants/url';
import {
  PostDataType,
  ReceivedSeriesType,
  ReceivedSnippetType,
} from '@/lib/types/PostType';
import { TagDetailType } from '@/lib/types/TagType';
import { BLOGDB } from '@/lib/Firebase';
import { cleanText } from '@/lib/SEO/makeMetaData';

const getAllPosts = async (feed: RSS) => {
  try {
    const postsRef = collection(BLOGDB, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as PostDataType[];
    posts.forEach((post: PostDataType) => {
      const date = new Date(post.createdAt);
      date.setHours(date.getHours() + 9);
      const content = cleanText(post.content);
      feed.item({
        title: post.title,
        description:
          content.length > 100 ? content.slice(0, 100) + '...' : content,
        url: `${URL}/${post.post?.type}/${post.post?.name}/${post.id}`,
        guid: post.id,
        date: date,
        categories: post.tags,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllSeries = async (feed: RSS) => {
  try {
    const postsRef = collection(BLOGDB, 'series');
    const q = query(postsRef);
    const querySnapshot = await getDocs(q);

    const series = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as ReceivedSeriesType[];

    series.forEach((serie, index) => {
      feed.item({
        title: serie.title,
        description: serie.description,
        url: `${URL}/series/${serie.id}`,
        guid: serie.id + index,
        date: new Date(),
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllSnippets = async (feed: RSS) => {
  try {
    const postsRef = collection(BLOGDB, 'snippets');
    const q = query(postsRef);
    const querySnapshot = await getDocs(q);

    const snippets = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as ReceivedSnippetType[];

    snippets.forEach((snippet, index) => {
      feed.item({
        title: snippet.title,
        description: `${snippet.title} 에 대한 스니펫입니다.`,
        url: `${URL}/snippets/${snippet.id}`,
        guid: snippet.id + index,
        date: new Date(),
      });
    });
  } catch (error) {
    console.error(error);
  }
};

type TagsType = {
  id: string;
  posts: TagDetailType[];
};

const getAllTags = async (feed: RSS) => {
  try {
    const postsRef = collection(BLOGDB, 'tags');
    const q = query(postsRef, orderBy('posts', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as TagsType[];

    data.forEach((tag, index) => {
      const url = encodeURIComponent(tag.id);
      feed.item({
        title: tag.id,
        description: `${tag.id} 태그에 대한 포스트입니다.`,
        url: `${URL}/posts/${url}`,
        guid: tag.id + index,
        date: new Date(),
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const GET = async () => {
  const feed = new RSS({
    title: '망그러진 블로그',
    description: 'Frontend Developer 찬우얌의 블로그',
    site_url: URL,
    feed_url: `${URL}/feed.xml`,
    copyright: '@ 2024 ChanwooYam',
    language: 'ko',
    pubDate: new Date().toUTCString(),
  });

  feed.item({
    title: 'All Series',
    description: '시리즈로 포스팅한 모든 게시물을 모아놓은 페이지입니다.',
    url: `${URL}/series`,
    guid: 'series',
    date: new Date(),
  });

  feed.item({
    title: 'All Snippets',
    description: '스니펫 게시물을 모아놓은 페이지입니다.',
    url: `${URL}/snippets`,
    guid: 'snippets',
    date: new Date(),
  });

  feed.item({
    title: 'All Posts',
    description: '포스팅한 모든 게시물을 모아놓은 페이지입니다.',
    url: `${URL}/posts`,
    guid: 'posts',
    date: new Date(),
  });

  await getAllPosts(feed);
  await getAllSeries(feed);
  await getAllSnippets(feed);
  await getAllTags(feed);

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
};
