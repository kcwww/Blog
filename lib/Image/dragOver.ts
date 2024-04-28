import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { postFormSchema } from '@/components/Form/PostForm';

const dragOver = (
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
      // const reader = new FileReader();
      fileList.forEach((file) => {
        console.log(file);
        // reader.onload = (e) => {};
      });
    }
  }
};

export default dragOver;
