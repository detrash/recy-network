import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RecyFormSubmission from '../form';
import { Button } from '@/components/ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCreateRecyclingReport } from '@/services/reports';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

interface ReportsModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function ReportsModal({ onClose, isOpen }: ReportsModalProps) {
  const { user } = useAuth();
  const { mutate: createReport, isPending: isPendingCreateRecycling, isSuccess } = useCreateRecyclingReport(user?.id);

  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const handleCreateReport = async (formData: FormData) => {
    createReport(formData);
  };

  if (isSuccess) {
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-hidden p-0" aria-description="Recy Form Submission">
        <div className="flex h-[80vh] flex-col">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Recy Form Submission</DialogTitle>
            <p className="text-muted-foreground mt-2 text-sm">
              Remember to fill the form with care. We are a reputation-based system.
            </p>
          </DialogHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <Button variant={isConnected ? 'outline' : 'default'} onClick={() => open()}>
                    {isConnected && address
                      ? `Wallet: ${address.slice(0, 4)}...${address.slice(-4)}`
                      : 'Connect Wallet'}
                  </Button>
                </div>
                <RecyFormSubmission onCreateReport={handleCreateReport} />
              </div>
            </ScrollArea>
          </div>
          <DialogFooter className="flex items-center gap-2 border-t px-6 py-4">
            <Button variant="default" disabled={isPendingCreateRecycling} type="submit" form="recy-form">
              {isPendingCreateRecycling && <Loader2 className="animate-spin" />}
              Confirmar
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
