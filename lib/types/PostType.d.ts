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

export type ReceivedPostDataType = {
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
  index: number;
};

export type ReceivedPostType = {
  message: string;
  type: { id: string; posts: string[] }[];
};
