'use client';

import {
  ApiProvider as GearApiProvider,
  AlertProvider as GearAlertProvider,
  AccountProvider,
  ProviderProps,
} from '@gear-js/react-hooks';
import { ReactNode } from 'react';

import { Alert, alertStyles } from '@gear-js/ui';

interface Props {
  children: ReactNode;
}

const GearProvider = ({ children }: Props) => {
  return (
    <GearApiProvider initialArgs={{ endpoint: 'wss://testnet.vara.network' }}>
      <GearAlertProvider template={Alert} containerClassName={alertStyles.root}>
        <AccountProvider>{children}</AccountProvider>
      </GearAlertProvider>
    </GearApiProvider>
  );
};

export default GearProvider;
