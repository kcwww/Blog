import { NextResponse, NextRequest } from 'next/server';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';

import { BLOGDB, loginUser } from '@/lib/Firebase';

const POST = async (req: NextRequest) => {
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

  try {
    await loginUser(session.user?.email || '');
    const docRef = await addDoc(collection(BLOGDB, 'posts'), data);

    if (data.post !== null) {
      const typeRef = doc(BLOGDB, data.post.type, data.post.name);
      const typeDoc = await getDoc(typeRef);
      if (!typeDoc.exists()) {
        await setDoc(typeRef, {
          posts: [
            {
              createdAt: data.createdAt,
              id: docRef.id,
              tags: data.tags,
              title: data.title,
            },
          ],
        });
      } else {
        const newData = typeDoc.data().posts;
        newData.push({
          createdAt: data.createdAt,
          id: docRef.id,
          tags: data.tags,
          title: data.title,
        });
        await setDoc(typeRef, { posts: newData }, { merge: true });
      }
    }
    if (data.tags !== null) {
      for (const tag of data.tags) {
        const tagRef = doc(BLOGDB, 'tags', tag);
        const tagDoc = await getDoc(tagRef);
        if (!tagDoc.exists()) {
          await setDoc(tagRef, {
            posts: [
              {
                createdAt: data.createdAt,
                id: docRef.id,
                title: data.title,
                tags: data.tags,
                post: {
                  type: data.post.type,
                  name: data.post.name,
                },
              },
            ],
          });
        } else {
          const newData = tagDoc.data().posts;
          newData.push({
            createdAt: data.createdAt,
            id: docRef.id,
            title: data.title,
            tags: data.tags,
            post: {
              type: data.post.type,
              name: data.post.name,
            },
          });
          await setDoc(tagRef, { posts: newData }, { merge: true });
        }
      }
    }

    revalidatePath('/', 'layout');
    return NextResponse.json({
      message: 'Post added with ID: ' + docRef.id,
      data: docRef.id,
    });
  } catch (e) {
    return NextResponse.json({
      message: 'Error adding document: ' + e,
    });
  }
};

export { POST };
