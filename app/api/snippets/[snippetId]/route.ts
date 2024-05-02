import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

export const GET = async (
  req: NextRequest,
  { params }: { params: { snippetId: string } }
) => {
  const id = params.snippetId;
  const postRef = doc(BLOGDB, 'snippets', id);

  try {
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: 'Snippets found',
        type: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      return NextResponse.json({
        message: 'No Snippets found with ID: ' + id,
      });
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Error retrieving document: ' + e,
    });
  }
};
