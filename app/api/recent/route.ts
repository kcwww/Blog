import { NextResponse, NextRequest } from 'next/server';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

// recent post get && series snippets check

// type series | snippets | null

const GET = async (req: NextRequest) => {
  try {
    const postsRef = collection(BLOGDB, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(12));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return NextResponse.json({
      message: 'Recent Posts fetched successfully',
      posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch recent posts',
        error,
      },
      { status: 500 }
    );
  }
};

export { GET };
