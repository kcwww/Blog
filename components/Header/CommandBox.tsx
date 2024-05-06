'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Code,
  Newspaper,
  Book,
  Mail,
  Github,
  Instagram,
  Linkedin,
  FolderOpenDot,
} from 'lucide-react';
import Fuse from 'fuse.js';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { BACKEND_ROUTES, ROUTES } from '@/constants/routes';
import LINK from '@/constants/link';
import clientComponentFetch from '@/lib/fetch/clientComponentFetch';
import { ReceivedPostDataType } from '@/lib/types/PostType';

const CommandBox = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Omit<ReceivedPostDataType, 'index'>[]>([]);
  const [fuse, setFuse] = useState<Fuse<
    Omit<ReceivedPostDataType, 'index'>
  > | null>(null);
  const [input, setInput] = useState('');

  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
      setInput('');
    };
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      setFuse(
        new Fuse(posts, {
          keys: ['title'],
          includeScore: true,
          includeMatches: true,
          threshold: 0.3,
        })
      );
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const res = await clientComponentFetch(BACKEND_ROUTES.POSTS);
      setPosts(res.posts);
    } catch (err) {
      toast.error(
        '게시물을 가져오는데 실패하였습니다. 잠시 후 다시 시도해주세요.'
      );
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          fetchPosts();
        }}
        className="text-sm text-muted-foreground flex gap-2 bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 "
      >
        Search...{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setInput('');
        }}
      >
        <div className="rounded">
          <CommandInput
            onValueChange={(str: string) => {
              setInput(str);
            }}
            placeholder="명령어 입력후 엔터를 눌러주세요."
            onKeyDown={(e) => {
              if (e.metaKey || e.ctrlKey) {
                e.preventDefault();
                switch (e.key) {
                  case 'p':
                    window.open(LINK.MAIL);
                    setOpen(false);
                    break;
                  case 'b':
                    window.open(LINK.GITHUB);
                    setOpen(false);
                    break;
                  case 's':
                    window.open(LINK.LINKEDIN);
                    setOpen(false);
                    break;
                  case 'f':
                    window.open(LINK.INSTAGRAM);
                    setOpen(false);
                    break;
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {fuse?.search(input).length !== 0 && (
              <CommandGroup heading="Posts">
                {fuse?.search(input).map((result, index) => {
                  const post = result.item;

                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        router.push(
                          ROUTES.TYPE_TO_POST(
                            post.post?.type || '',
                            post.post?.name || '',
                            post.id
                          )
                        );
                        setOpen(false);
                      }}
                      onClick={() => {
                        router.push(
                          ROUTES.TYPE_TO_POST(
                            post.post?.type || '',
                            post.post?.name || '',
                            post.id
                          )
                        );
                        setOpen(false);
                      }}
                    >
                      {post.title}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => {
                  router.push(ROUTES.POSTS);
                  setOpen(false);
                }}
              >
                <Newspaper className="mr-2 h-4 w-4" />
                <span>All Posts</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(ROUTES.SERIES);
                  setOpen(false);
                }}
              >
                <Book className="mr-2 h-4 w-4" />
                <span>All Series</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push(ROUTES.SNIPPETS);
                  setOpen(false);
                }}
              >
                <Code className="mr-2 h-4 w-4" />
                <span>All Snippets</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  window.open(LINK.PORTFOLIO);
                  setOpen(false);
                }}
              >
                <FolderOpenDot className="mr-2 h-4 w-4" />
                <span>Portfolio</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Contact">
              <CommandItem
                onSelect={() => {
                  window.open(LINK.MAIL);
                  setOpen(false);
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>Mail</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  window.open(LINK.GITHUB);
                  setOpen(false);
                }}
              >
                <Github className="mr-2 h-4 w-4" />
                <span>Github</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  window.open(LINK.INSTAGRAM);
                  setOpen(false);
                }}
              >
                <Instagram className="mr-2 h-4 w-4" />
                <span>Instagram</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  window.open(LINK.LINKEDIN);
                  setOpen(false);
                }}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                <span>Linkedin</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
};

export default CommandBox;
