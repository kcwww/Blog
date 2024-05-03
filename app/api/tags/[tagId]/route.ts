import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

export const GET = async (
  req: NextRequest,
  { params }: { params: { tagId: string } }
) => {
  const id = params.tagId;
  const postRef = doc(BLOGDB, 'tags', id);

  try {
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: 'Tags found',
        type: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      return NextResponse.json(
        {
          message: 'No Snippets found with ID: ' + id,
        },
        { status: 404 }
      );
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Error retrieving document: ' + e,
    });
  }
};
