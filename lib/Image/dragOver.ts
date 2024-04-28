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

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          form.setValue(name as 'content', before + e.target.result + after);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }
};

export default dragOver;
