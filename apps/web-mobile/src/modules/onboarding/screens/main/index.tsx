import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import OnboardingForm from '../../components/form';
import { useAuth } from '@/hooks/auth';

export default function OnboardingScreen() {
  const { user, hasNewUserRole, hasAdminPrivileges } = useAuth();

  const showOnboardingModal = !hasNewUserRole || hasAdminPrivileges;

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);

  if (showOnboardingModal) return null;

  if (!user) return null;

  return (
    <Dialog open={isOnboardingOpen} onOpenChange={() => setIsOnboardingOpen(false)}>
      <DialogContent
        aria-description="Onboarding"
        className="max-w-4xl overflow-hidden p-0 [&>button]:hidden"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle className="sr-only">Onboarding</DialogTitle>
        {<OnboardingForm userId={user.id} onClose={() => setIsOnboardingOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}
