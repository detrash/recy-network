export const SUPPORTED_IMAGE_FORMATS = ['png', 'jpg', 'jpeg'];
export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'mpeg', 'mpg'];
export const SUPPORTED_PDF_FORMAT = 'pdf';

export const AuditStatusConstants = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;
