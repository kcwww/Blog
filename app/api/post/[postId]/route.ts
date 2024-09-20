import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';

import { BLOGDB, loginUser } from '@/lib/Firebase';
import { PostDataType, PostListType } from '@/lib/types/PostType';

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  console.log(req);
  const id = params.postId;
  const postRef = doc(BLOGDB, 'posts', id);

  try {
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: 'Post found',
        data: { ...docSnap.data(), id: docSnap.id },
      });
    } else {
      return NextResponse.json({
        message: 'No post found with ID: ' + id,
      });
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Error retrieving document: ' + e,
    });
  }
};

const updateType = async (
  type: string,
  name: string,
  id: string,
  title: string
) => {
  const typeRef = doc(BLOGDB, type, name);
  const typeDoc = await getDoc(typeRef);
  const data = typeDoc.data();
  const posts = data?.posts;
  const newPosts = posts.map((post: PostListType) =>
    post.id === id ? { ...post, title } : post
  );
  await setDoc(typeRef, { posts: newPosts, ...data });
};

const updateTag = async (tag: string, id: string, title: string) => {
  const tagRef = doc(BLOGDB, 'tags', tag);
  const tagDoc = await getDoc(tagRef);
  const data = tagDoc.data();
  const posts = data?.posts;
  const newPosts = posts.map((post: PostListType) =>
    post.id === id ? { ...post, title } : post
  );
  await setDoc(tagRef, { posts: newPosts, ...data });
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const data = await req.json();
  const id = params.postId;

  try {
    await loginUser(session.user?.email || '');
    const postRef = doc(BLOGDB, 'posts', id);
    await setDoc(postRef, data);

    const title = data.title;
    const tags = data.tags;

    await Promise.all(
      tags.map(async (tag: string) => await updateTag(tag, id, title))
    );
    await updateType(data.post.type, data.post.name, id, title);
    revalidatePath('/', 'layout');

    return NextResponse.json({
      message: 'Post updated',
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Error updating document: ' + e,
      },
      { status: 500 }
    );
  }
};

const deleteType = async (type: string, name: string, id: string) => {
  const typeRef = doc(BLOGDB, type, name);
  const typeDoc = await getDoc(typeRef);
  const data = typeDoc.data();
  const posts = data?.posts;
  const newPosts = posts.filter((post: PostListType) => post.id !== id);
  const title = data?.title;
  const description = data?.description;
  if (newPosts.length === 0) {
    await deleteDoc(typeRef);
  } else {
    await setDoc(typeRef, { posts: newPosts, title, description });
  }
};

const deleteTag = async (tag: string, id: string) => {
  const tagRef = doc(BLOGDB, 'tags', tag);
  const tagDoc = await getDoc(tagRef);
  const data = tagDoc.data();
  const posts = data?.posts;
  const newPosts = posts.filter((post: PostListType) => post.id !== id);
  if (newPosts.length === 0) {
    await deleteDoc(tagRef);
  } else {
    await setDoc(tagRef, { posts: newPosts });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  console.log(req);

  const session = await getServerSession();

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = params.postId;

  try {
    await loginUser(session.user?.email || '');
    const docRef = await doc(BLOGDB, 'posts', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as Omit<PostDataType, 'id'>;
    const tags = data.tags;
    const [type, name] = data.post
      ? [data.post.type, data.post.name]
      : [null, null];
    tags && tags.forEach(async (tag) => await deleteTag(tag, id));
    type && name && (await deleteType(type, name, id));
    await deleteDoc(docRef);
    revalidatePath('/', 'layout');
    return NextResponse.json({ message: 'Post deleted' });
  } catch (e) {
    return NextResponse.json({ message: 'Error deleting document: ' + e });
  }
};
