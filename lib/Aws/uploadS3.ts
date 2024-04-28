'use client';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  },
});

const uploadImg = async (files: File[]) => {
  const uploadPromise = files.map((file) => {
    if (!file) return null;

    const filenames = file.name.split('.');
    const extention = filenames.pop();

    const filename = `${Date.now() + Math.floor(Math.random() * 1000)}.${extention}`;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET || '',
      Key: `Threads/${filename}`,
      Body: file,
    };

    try {
      const command = new PutObjectCommand(params);

      s3Client.send(command);
      return `https://s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${params.Key}`;
    } catch (error) {
      console.error('Error uploading image', error);
      return null;
    }
  });

  const results = await Promise.all(uploadPromise);
  const imgUrls = results.map((res) => {
    if (res === null) return null;
    return res as string;
  });

  return imgUrls;
};

export default uploadImg;
