import { NextResponse, NextRequest } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth/next';

import { BLOGDB, loginUser } from '@/lib/Firebase';

const POST = async (req: NextRequest) => {
  const session = await getServerSession();
  console.log('session', session);

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
