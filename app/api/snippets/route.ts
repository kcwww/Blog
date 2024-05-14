import { NextResponse, NextRequest } from 'next/server';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

const GET = async (req: NextRequest) => {
  req.json();
  try {
    const postsRef = collection(BLOGDB, 'snippets');
    const q = query(postsRef, orderBy('posts', 'desc'));
    const querySnapshot = await getDocs(q);

    const snippets = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return NextResponse.json({
      message: 'All Snippets fetched successfully',
      type: snippets,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch Snippets',
        error,
      },
      { status: 500 }
    );
  }
};

export { GET };
