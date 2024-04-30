import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  const id = params.postId;
  const postRef = doc(BLOGDB, 'posts', id);

  try {
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: 'Post found',
        data: docSnap.data(),
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
