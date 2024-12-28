import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AuditsTable = {
  id: string;
  date: string;
  status: 'Approved' | 'Rejected' | 'Pending';
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
      const status = row.getValue('status');

      return (
        <div className={`flex items-center space-x-2`}>
          <Badge
            variant={status === 'Approved' ? 'default' : status === 'Rejected' ? 'destructive' : 'secondary'}
            className={status === 'Approved' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            {status as string}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
];
