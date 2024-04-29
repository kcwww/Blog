import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ImageUploader } from '@/lib/Image/ImageUploader';
import { postFormSchema } from '@/components/Form/PostForm';

type ImageUploadDataTypes = {
  name: string;
  url: string;
};

const dragOver = async (
  e: React.DragEvent<HTMLTextAreaElement>,
  form: UseFormReturn<z.infer<typeof postFormSchema>>,
  name: string
) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length === 0) {
    return;
  } else {
    const textarea = e.target as HTMLTextAreaElement;

    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const before = form.getValues(name as 'content').slice(0, startPos);
      const after = form.getValues(name as 'content').slice(endPos);
      const fileList = Array.from(files);

      const loadingText = fileList.map((file) => {
        return `![${file.name}](loading...)`;
      });
      const newText = `${before}${loadingText.join('\n')}${after}`;
      form.setValue(name as 'content', newText);

      const uploader = new ImageUploader();
      try {
        const data = await uploader.uploadImg(fileList);
        const uploadedText = data.map((img: ImageUploadDataTypes) => {
          return `![${img.name}](${img.url})`;
        });
        const finalText = `${before}${uploadedText.join('\n')}${after}`;
        form.setValue(name as 'content', finalText);
      } catch (e) {
        console.error(e);
        toast.error('이미지 업로드에 실패했습니다.');
        form.setValue(
          name as 'content',
          `${before}업로드에 실패하였습니다.${after}`
        );
      }
    }
  }
};

export default dragOver;
