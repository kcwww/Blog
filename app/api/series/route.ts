import { NextResponse, NextRequest } from 'next/server';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

const GET = async (req: NextRequest) => {
  try {
    const postsRef = collection(BLOGDB, 'series');
    const q = query(postsRef, orderBy('posts', 'desc'));
    const querySnapshot = await getDocs(q);

    const series = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return NextResponse.json({
      message: 'All Series fetched successfully',
      series,
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
