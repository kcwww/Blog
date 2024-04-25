'use client';

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/constants/routes';
import type { PostType } from '@/lib/types/PostType';

const postFormSchema = z.object({
  title: z.string().min(1, {
    message: 'title must be at least 2 characters.',
  }),
  content: z.string().min(1, {
    message: 'content must be at least 2 characters.',
  }),
  tags: z.string().optional(),
  thumbnail: z.string().optional(),
});

const PostForm = () => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      thumbnail: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const tags = data.tags?.split(',').map((tag) => tag.trim());
    const postData = {
      ...data,
      tags,
    } as PostType;
    try {
      const res = await clientComponentFetch(BACKEND_ROUTES.POST, {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      toast.success('포스팅 성공 !');
      form.reset();
    } catch (e) {
      toast.error('포스팅 실패 !');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={field.name}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-96"
                  placeholder="content"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={field.name}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={field.name}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PostForm;
