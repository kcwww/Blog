import { ReceivedPostDataType } from '@/lib/types/PostType';

export type PostDataType = {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  post: {
    name: string;
    type: string;
  } | null;
  id: string;
};

export type ReceivedPostDataType = PostDataType & {
  index: number;
};

export type PostListType = Pick<
  PostDataType,
  'createdAt' | 'tags' | 'title'
> & { id: string };

export type ReceivedPostTypeDetail = {
  id: string;
  title: string;
  description: string;
  type: string;
  posts: PostListType[];
};

export type ReceivedPostType = {
  message: string;
  type: ReceivedPostTypeDetail[];
};

export type ReceivedSnippetType = {
  id: string;
  title: string;
  posts: PostListType[];
};
