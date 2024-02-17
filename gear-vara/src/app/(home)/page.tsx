'use client';

import Wallet from '@/components/wallet';
import GearProvider from '@/lib/providers/gear';
import { useApi, useAccount } from '@gear-js/react-hooks';

const Home = () => {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();
  const isAppReady = isApiReady && isAccountReady;

  return (
    <main>
      {isAppReady ? (
        <>
          <div>
            <Wallet />
          </div>

          <div>Home</div>
        </>
      ) : (
        'Initializing APP'
      )}
    </main>
  );
};

export default Home;
