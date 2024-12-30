import DashboardScreen from '@/modules/dashboard/screens/home';
import OnboardingScreen from '@/modules/onboarding/screens/main';

export default function Dashboard() {
  return (
    <>
      <OnboardingScreen />
      <DashboardScreen />;
    </>
  );
}
