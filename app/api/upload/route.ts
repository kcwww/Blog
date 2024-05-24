import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth/next';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
  },
});

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll('file');
    if (!files) throw new Error('No file uploaded.');

    const promises = files.map(async (file) => {
      if (!(file instanceof File)) throw new Error('Invalid file type.');
      const filename = file.name.split('.');
      const extension = filename.pop();

      const key = `posts/${Date.now() + Math.floor(Math.random() * 1000)}.${extension}`;

      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
          Body: file.stream(),
          ContentType: file.type,
        },
      });

      await upload.done();

      return {
        url: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${key}`,
        name: file.name,
      };
    });

    const urls = await Promise.all(promises);

    return NextResponse.json({ status: 'success', urls });
  } catch (e) {
    console.error('Upload failed:', e);
    return NextResponse.json({ status: 'fail', data: e });
  }
};
