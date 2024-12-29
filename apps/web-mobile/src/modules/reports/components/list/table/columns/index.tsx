import { ColumnDef } from '@tanstack/react-table';
import { Icon } from '@iconify/react';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { AuditStatusConstants } from '@/constants/index';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReportTable = {
  id: string;
  date: string;
  status: keyof typeof AuditStatusConstants;
  evidence: string;
  quantity: string;
};

export const columns: ColumnDef<ReportTable>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: keyof typeof AuditStatusConstants = row.getValue('status');

      return (
        <div className={`flex items-center space-x-2`}>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'evidence',
    header: 'Evidence',
    cell: ({ row }) => {
      const evidenceUrl = row.getValue('evidence');
      return (
        <Button size="sm" onClick={() => window.open(String(evidenceUrl), '_blank')}>
          <Icon icon="mdi:download" className="h-4" />
        </Button>
      );
    },
  },
];
