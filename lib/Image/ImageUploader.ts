'use client';

type ImageUploaderType = {
  apiUrl: string;
};

export class ImageUploader implements ImageUploaderType {
  apiUrl: string;

  constructor() {
    this.apiUrl = '/api/upload';
  }

  async resizeImg(files: File[]) {
    const resizePromise = files.map((file) => {
      if (!file) return null;

      if (file.type === 'image/gif') return Promise.resolve(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              resolve(null);
              return;
            }

            const MAX_WIDTH = 1920;
            const MAX_HEIGHT = 1080;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(null);
                  return;
                }

                const resizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });

                resolve(resizedFile);
              },
              'image/jpeg',
              1
            );
          };
        };
      });
    });

    const results = await Promise.all(resizePromise);
    const resizedFiles = results.map((res) => {
      if (res === null) return null;
      return res as File;
    });

    return resizedFiles;
  }

  async uploadImg(files: File[]) {
    const resizedFiles = await this.resizeImg(files);

    const formData = new FormData();
    resizedFiles.forEach((file) => {
      if (file) {
        formData.append('file', file);
      }
    });

    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      return data.urls;
    } catch (e) {
      console.error(e);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  }
}
