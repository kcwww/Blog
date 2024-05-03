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
} from 'lucide-react';

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

const CommandBox = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
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
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await clientComponentFetch(BACKEND_ROUTES.POSTS);
      console.log(res);
      setPosts(res);
    } catch (err) {
      console.error(err);
      // router.replace(ROUTES.NOT_FOUND);
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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="rounded">
          <CommandInput
            onValueChange={(str: string) => {
              setInput(str);
            }}
            placeholder="Type a command or search..."
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
