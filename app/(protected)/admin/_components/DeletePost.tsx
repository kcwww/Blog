'use client';

import { Button } from '@/components/ui/button';
import useModal from '@/lib/hooks/useModal';

const DeletePost = ({ id }: { id: string }) => {
  const { onOpen } = useModal();

  return (
    <>
      <Button
        onClick={() => onOpen('Delete', { data: id })}
        variant={'destructive'}
      >
        Delete Post
      </Button>
    </>
  );
};

export default DeletePost;
