import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

export const GET = async (
  req: NextRequest,
  { params }: { params: { seriesId: string } }
) => {
  const id = params.seriesId;
  const postRef = doc(BLOGDB, 'series', id);

  try {
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        message: 'Series found',
        type: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      return NextResponse.json({
        message: 'No series found with ID: ' + id,
      });
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Error retrieving document: ' + e,
    });
  }
};
