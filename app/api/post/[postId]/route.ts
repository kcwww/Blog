import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';

import { BLOGDB, loginUser } from '@/lib/Firebase';

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
