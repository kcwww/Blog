'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { marked } from 'marked';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import type { PostDataType } from '@/lib/types/PostType';
import dragOver from '@/lib/Image/dragOver';

export const postFormSchema = z.object({
  title: z.string().min(1, {
    message: 'title must be at least 2 characters.',
  }),
  content: z.string().min(1, {
    message: 'content must be at least 2 characters.',
  }),
  tags: z.string().optional(),
  thumbnail: z.string().optional(),
  type: z.string().optional(),
  typeName: z.string().optional(),
});

const PostForm = ({ post }: { post: PostDataType | null }) => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      thumbnail: '',
      type: 'none',
      typeName: '',
    },
  });

  useEffect(() => {
    if (post !== null) {
      form.reset(post);
      form.setValue('title', post.title);
      form.setValue('content', post.content);
      form.setValue('tags', post.tags.join(','));
      form.setValue('thumbnail', post.thumbnail);
      form.setValue('type', post.post?.type ?? 'none');
      form.setValue('typeName', post.post?.name ?? '');
    }
  }, [form, post]);

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const tags =
      data.tags === '' || data.tags === undefined
        ? null
        : data.tags.split(',').map((tag) => tag.trim());

    const date = new Date();
    date.setHours(date.getHours() + 9);
    const koreaDate = date.toISOString().slice(0, 19).replace('T', ' ');
    const postData = {
      ...data,
      tags,
      createdAt: koreaDate,
      post:
        data.type === 'none'
          ? null
          : {
              type: data.type,
              name: data.typeName,
            },
    } as PostDataType;
    delete postData.type;
    delete postData.typeName;
    try {
      const res = await clientComponentFetch(BACKEND_ROUTES.POST, {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      form.reset();
      toast.success('포스팅 성공 !');
      router.push(ROUTES.LANDING);
      router.refresh();
    } catch (e) {
      toast.error('포스팅 실패 !');
    }
  };

  const previewMarkdown = () => {
    const content = form.getValues('content');
    const htmlContent = marked(content);
    const windowFeatures = 'left=100,top=100,width=960,height=960';
    const newWindow = window.open('', '_blank', windowFeatures);
    if (!newWindow) {
      return;
    }
    newWindow.document.open();
    newWindow.document.write(
      `<html><head><title>Markdown Preview</title></head><body>${htmlContent}</body></html>`
    );
    newWindow.document.close();
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
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    dragOver(e, form, 'content');
                  }}
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue('typeName', '');
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="series">series</SelectItem>
                  <SelectItem value="snippets">snippets</SelectItem>
                  <SelectItem value="none">none</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="typeName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={field.name}
                  {...field}
                  disabled={isLoading || form.watch('type') === 'none'}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 w-1/2">
          <Button onClick={() => previewMarkdown()} type="button">
            Preview
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
