import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import OnboardingForm from '../../components/form';
import { useAuth } from '@/hooks/auth';
export default function OnboardingScreen() {
  const { user, hasNewUserRole } = useAuth();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(hasNewUserRole);

  if (!hasNewUserRole) return null;

  if (!user) return null;

  return (
    <Dialog open={isOnboardingOpen} onOpenChange={() => setIsOnboardingOpen(false)}>
      <DialogContent
        className="max-w-4xl overflow-hidden p-0 [&>button]:hidden"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {<OnboardingForm userId={user.id} onClose={() => setIsOnboardingOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}
