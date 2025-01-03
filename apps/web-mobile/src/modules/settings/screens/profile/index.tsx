'use client';

import ProfileForm from '@/modules/settings/components/profile/profile-form';

export default function SettingsMainScreen() {
  return (
    <div className="container my-10 space-y-6 rounded-md border py-8 shadow-xl">
      <h3 className="mb-10 text-3xl font-bold">Profile settings</h3>
      <ProfileForm />
    </div>
  );
}
