import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { AuditStatusConstants } from '@/constants/index';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AuditsTable = {
  id: string;
  date: string;
  status: keyof typeof AuditStatusConstants;
  comments: string;
};

export const columns: ColumnDef<AuditsTable>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
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
];
