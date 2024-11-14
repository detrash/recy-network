'use client';

import ProfileForm from '@/modules/settings/components/profile/profile-form';

export default function SettingsMainScreen() {
  return (
    <div className="container space-y-6">
      <h3 className="text-lg font-medium">Profile settings</h3>
      <ProfileForm />
    </div>
  );
}
