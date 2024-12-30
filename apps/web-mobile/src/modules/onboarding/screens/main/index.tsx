import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import OnboardingForm from '../../components/form';

export default function OnboardingScreen() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);

  return (
    <Dialog open={isOnboardingOpen} onOpenChange={() => setIsOnboardingOpen(false)}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        {/* TODO: Remove id hardcoded */}
        <OnboardingForm userId="0779f19c-34a8-40c2-a482-54a353a507c0" onClose={() => setIsOnboardingOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
