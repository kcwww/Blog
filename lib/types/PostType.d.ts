export type PostType = {
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

export type RecievedPostType = {
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
