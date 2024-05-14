import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import useModal from '@/lib/hooks/useModal';

const ImageModal = () => {
  const { onClose, isOpen, type, props } = useModal();

  if (type !== 'Image') return null;

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2/3 max-h-[75svh] overflow-scroll">
        <Image
          src={props.data}
          alt="Image"
          width={1920}
          height={1080}
          quality={100}
          className="rounded-md"
        />

        <DialogFooter>
          <Button onClick={() => onClose()}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
