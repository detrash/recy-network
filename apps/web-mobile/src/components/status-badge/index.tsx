import { AuditStatusConstants } from '@/constants/index';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';

const STATUS_STYLES = {
  [AuditStatusConstants.PENDING]: {
    className: 'bg-gray-200 text-gray-700',
  },
  [AuditStatusConstants.APPROVED]: {
    className: 'bg-green-500 text-white',
  },
  [AuditStatusConstants.REJECTED]: {
    className: 'bg-red-500 text-white',
  },
  [AuditStatusConstants.COMPLETED]: {
    className: 'bg-blue-500 text-white',
  },
  [AuditStatusConstants.FAILED]: {
    className: 'bg-orange-500 text-white',
  },
};

export const StatusBadge = ({ status }: { status: keyof typeof AuditStatusConstants }) => {
  const { className } = STATUS_STYLES[status] || {
    className: 'bg-gray-100 text-gray-500',
  };

  return <Badge className={cn(className, 'pointer-events-none')}>{status}</Badge>;
};
