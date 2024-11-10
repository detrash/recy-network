import type { WithAuth0Props } from '@auth0/auth0-react';
import { withAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import SumsubWebSdk from '@sumsub/websdk-react';

import { useToast } from '@/components/ui/use-toast';

import { getSDKAccessToken } from './sumsub';

function KYC(props: WithAuth0Props) {
  const { toast } = useToast();

  return (
    <SumsubWebSdk
      accessToken="x"
      testEnv={import.meta.env.NEXT_PUBLIC_SUMSUB_ENV === 'sandbox'}
      onError={({ error }) => toast({
        title: error,
      })}
      expirationHandler={() => getSDKAccessToken(props)}
      options={{ debug: true }}
    />
  );
}

export default withAuthenticationRequired(withAuth0(KYC));
