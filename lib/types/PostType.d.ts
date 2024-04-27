export type PostType = {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
};

export type RecievedPostType = {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  id: string;
  index: number;
};
