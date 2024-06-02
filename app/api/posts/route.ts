import { NextResponse, NextRequest } from 'next/server';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

const GET = async (req: NextRequest) => {
  console.log(req);
  try {
    const postsRef = collection(BLOGDB, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
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
        message: 'Failed to fetch posts',
        error,
      },
      { status: 500 }
    );
  }
};

export { GET };
