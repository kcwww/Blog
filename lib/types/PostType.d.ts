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
};

export type ReceivedPostDataType = PostDataType & {
  id: string;
  index: number;
};

export type PostListType = Pick<
  PostDataType,
  'createdAt' | 'tags' | 'title'
> & { id: string };

export type ReceivedPostType = {
  message: string;
  type: {
    id: string;
    title: string;
    description: string;
    type: string;
    posts: PostListType[];
  }[];
};
