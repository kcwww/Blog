import Giscus from '@/components/Comments/Giscus';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Giscus />
    </>
  );
};

export default PostLayout;
