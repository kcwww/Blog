import { NextResponse, NextRequest } from 'next/server';
import { collection, query, getDocs } from 'firebase/firestore';

import { BLOGDB } from '@/lib/Firebase';

const GET = async (req: NextRequest) => {
  req.json();
  try {
    const postsRef = collection(BLOGDB, 'series');
    const q = query(postsRef);
    const querySnapshot = await getDocs(q);

    const series = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    series.sort((a, b) => (a.id > b.id ? 1 : -1));

    return NextResponse.json({
      message: 'All Series fetched successfully',
      type: series,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch Series',
        error,
      },
      { status: 500 }
    );
  }
};

export { GET };
