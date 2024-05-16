import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import useModal from '@/lib/hooks/useModal';
import { BACKEND_ROUTES } from '@/constants/routes';

const DeleteModal = () => {
  const { onClose, isOpen, type, props } = useModal();
  const router = useRouter();
  if (type !== 'Delete') return null;

  const fetchDelete = async () => {
    const id = props.data;
    try {
      const res = await clientComponentFetch(BACKEND_ROUTES.POST_ID(id), {
        method: 'DELETE',
      });
      toast.success(res.message);
      router.replace('/admin');
      router.refresh();
      onClose();
    } catch (e) {
      toast.error('Error deleting post');
      console.error(e);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        Are you sure you want to delete this Post?
        <DialogFooter>
          <Button variant={'secondary'} onClick={() => onClose()}>
            Close
          </Button>
          <Button variant={'destructive'} onClick={() => fetchDelete()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
