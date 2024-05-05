import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import useModal from '@/lib/hooks/useModal';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ImageModal = () => {
  const { onClose, isOpen, type, props } = useModal();

  if (type !== 'Image') return null;

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-full">
        <Image
          src={props.data}
          alt="Image"
          width={1920}
          height={1080}
          quality={100}
          className="rounded-md overflow-hidden"
        />

        <DialogFooter>
          <Button onClick={() => onClose()}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
