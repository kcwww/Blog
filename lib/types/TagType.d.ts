import type { PostDataType } from '@/lib/types/PostType';

export type ReceivedTagsType = {
  message: string;
  tags: { id: string; posts: string[] }[];
};

export type TagDetailType = Omit<PostDataType, 'content' | 'thumbnail'> & {
  id: string;
};

export type ReceivedTagType = {
  message: string;
  type: {
    id: string;
    posts: TagDetailType[];
  };
};
