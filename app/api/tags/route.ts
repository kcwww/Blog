import { NextResponse, NextRequest } from 'next/server';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

const GET = async (req: NextRequest) => {
  req.json();
  try {
    const postsRef = collection(BLOGDB, 'tags');
    const q = query(postsRef, orderBy('posts', 'desc'));
    const querySnapshot = await getDocs(q);

    const tags = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return NextResponse.json({
      message: 'All Tags fetched successfully',
      tags,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch tags',
        error,
      },
      { status: 500 }
    );
  }
};

export { GET };
