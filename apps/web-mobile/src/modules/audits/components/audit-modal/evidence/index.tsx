import { SUPPORTED_IMAGE_FORMATS, SUPPORTED_PDF_FORMAT, SUPPORTED_VIDEO_FORMATS } from '@/constants/index';

export const Evidence = ({ url }: { url: string }) => {
  if (!url) {
    return (
      <div className="text-center text-gray-500">
        <p>No evidence available</p>
      </div>
    );
  }

  const fileExtension = url.split('.').pop()?.toLowerCase();

  if (SUPPORTED_IMAGE_FORMATS.includes(fileExtension || '')) {
    return (
      <img src={url} alt="Residue Evidence" className="max-h-[400px] w-full rounded-lg object-contain shadow-md" />
    );
  }

  if (fileExtension === SUPPORTED_PDF_FORMAT) {
    return <embed src={url} type="application/pdf" width="100%" height="400px" className="rounded-lg shadow-md" />;
  }

  if (SUPPORTED_VIDEO_FORMATS.includes(fileExtension || '')) {
    return <video src={url} controls className="w-full rounded-lg shadow-md" style={{ maxHeight: '400px' }} />;
  }

  return (
    <div className="text-center text-gray-500">
      <p>Unsupported file format</p>
    </div>
  );
};
