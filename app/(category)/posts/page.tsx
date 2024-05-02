import Introduce from '@/components/Main/Introduce';

import Tags from '@/app/(category)/posts/_components/Tags';
import PostsBox from '@/app/(category)/posts/_components/PostsBox';

const PostsPage = () => {
  const title = 'All Posts';
  const description = [
    '포스팅한 모든 게시글을 확인하실 수 있습니다.',
    '개발 이야기, 일상 이야기 등 다양한 주제로 포스팅하고 있습니다.',
  ];
  return (
    <>
      <Introduce title={title} description={description} />
      <Tags />
      <PostsBox type="series" />
      <PostsBox type="snippets" />
    </>
  );
};

export default PostsPage;
