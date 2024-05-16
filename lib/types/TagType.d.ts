import type { PostDataType } from '@/lib/types/PostType';

export type ReceivedTagsType = {
  message: string;
  tags: { id: string; posts: Omit<PostDataType, 'content' | 'thumbnail'>[] }[];
};

export type TagDetailType = Omit<PostDataType, 'content' | 'thumbnail'>;

export type ReceivedTagType = {
  message: string;
  type: {
    id: string;
    posts: TagDetailType[];
  };
};
