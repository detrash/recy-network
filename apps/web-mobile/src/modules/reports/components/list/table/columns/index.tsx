import { ColumnDef } from '@tanstack/react-table';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReportTable = {
  id: string;
  date: string;
  audited: 'yes' | 'no';
  evidence: string;
  total: string;
};

export const columns: ColumnDef<ReportTable>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
  {
    accessorKey: 'audited',
    header: 'Audited',
    cell: ({ row }) => {
      const audited = row.getValue('audited');

      const iconColorClass =
        audited === 'yes' ? 'text-green-500' : audited === 'no' ? 'text-red-500' : 'text-yellow-500'; // Adaptação para

      return (
        <div className={`flex items-center space-x-2 ${iconColorClass}`}>
          <Icon icon="mdi:check-circle" className={`h-4 w-4 ${iconColorClass}`} />
          <span>{audited === 'yes' ? 'Audited' : 'Not Audited'}</span>
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
