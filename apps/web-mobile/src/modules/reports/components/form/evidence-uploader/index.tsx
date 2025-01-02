import { Button } from '@/components/ui/button';
import { SUPPORTED_IMAGE_FORMATS, SUPPORTED_VIDEO_FORMATS, SUPPORTED_PDF_FORMAT } from '@/constants/index';

export const EvidenceUploader = ({
  field,
  onRemove,
}: {
  field: { value: File | null; onChange: (file: File | null) => void };
  onRemove?: () => void;
}) => {
  const file = field.value;
  const fileExtension = file?.name.split('.').pop()?.toLowerCase();

  return (
    <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
      <div className="text-center">
        {file ? (
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-sm text-gray-700">File uploaded: {file.name}</p>
            {SUPPORTED_IMAGE_FORMATS.includes(fileExtension || '') && (
              <img src={URL.createObjectURL(file)} alt="Preview" className="object-cover mt-2 rounded-lg h-72 w-72" />
            )}
            {SUPPORTED_VIDEO_FORMATS.includes(fileExtension || '') && (
              <video controls src={URL.createObjectURL(file)} className="object-cover mt-2 rounded-lg h-72 w-72">
                Your browser does not support the video tag.
              </video>
            )}
            {fileExtension === SUPPORTED_PDF_FORMAT && (
              <embed
                src={URL.createObjectURL(file)}
                type="application/pdf"
                width="100%"
                height="200px"
                className="rounded-lg shadow-md"
              />
            )}
            {!(
              SUPPORTED_IMAGE_FORMATS.includes(fileExtension || '') ||
              SUPPORTED_VIDEO_FORMATS.includes(fileExtension || '') ||
              fileExtension === SUPPORTED_PDF_FORMAT
            ) && (
              <div className="text-center text-gray-500">
                <p>Unsupported file format</p>
              </div>
            )}
            <Button
              variant="destructive"
              type="button"
              className="mt-4"
              onClick={() => {
                field.onChange(null);
                if (onRemove) onRemove();
              }}
            >
              Remove file
            </Button>
          </div>
        ) : (
          <div>
            <svg className="w-12 h-12 mx-auto text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex mt-4 text-sm leading-6 text-gray-600">
              <label
                htmlFor="evidence"
                className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="evidence"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.png,.mp4,.mpeg,.mpg"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Supported formats: PDF, PNG, MP4, MPEG, MPG. Maximum of 1 file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
