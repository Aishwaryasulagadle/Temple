export async function uploadToImageKit(buffer: Buffer, fileName: string): Promise<string | null> {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || process.env.PRIVATE_KEY || 'private_ZFQCtaxaLRnQ+lWjxoKesPnLI2g=';
    const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64');

    const form = new FormData();
    const blob = new Blob([new Uint8Array(buffer)]);
    form.append('file', blob, fileName);
    form.append('fileName', fileName);
    form.append('folder', '/temple_projects');

    const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: {
        Authorization: authHeader
      },
      body: form
    });

    const data = await res.json();
    if (data && data.url) {
      return data.url;
    }
    console.warn('ImageKit response:', data);
    return null;
  } catch (err) {
    console.error('ImageKit upload error:', err);
    return null;
  }
}
