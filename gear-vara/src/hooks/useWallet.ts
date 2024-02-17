'use client';

import { useAccount } from '@gear-js/react-hooks';
import { LOCAL_STORAGE, WALLET } from '@/lib/utils/constants';
import { WalletId } from '@/interface';
import { useLocalStorage } from './useLocalStorage';
import { useState } from 'react';

export const useWallet = () => {
  const { accounts } = useAccount();
  // const [walletId, setWalletId] = useLocalStorage<WalletId | null>(
  //   LOCAL_STORAGE.WALLET,
  //   localStorage[LOCAL_STORAGE.WALLET]
  // );

  // const resetWalletId = () => setWalletId(null);
  // const getWalletAccounts = (id: WalletId) => accounts?.filter(({ meta }) => meta.source === id);

  // const saveWallet = () => {
  //   walletId && setWalletId(walletId);
  // };

  // const removeWallet = () => localStorage.removeItem(LOCAL_STORAGE.WALLET);




  const [walletId, setWalletId] = useState<WalletId | undefined>(localStorage[LOCAL_STORAGE.WALLET]);

  const resetWalletId = () => setWalletId(undefined);

  const getWalletAccounts = (id: WalletId) => accounts?.filter(({ meta }) => meta.source === id);

  const saveWallet = () => walletId && localStorage.setItem(LOCAL_STORAGE.WALLET, walletId);

  const removeWallet = () => localStorage.removeItem(LOCAL_STORAGE.WALLET);
  const wallet = walletId && WALLET[walletId];
  const walletAccounts = walletId && getWalletAccounts(walletId);

  return {
    wallet,
    walletAccounts,
    setWalletId,
    resetWalletId,
    getWalletAccounts,
    saveWallet,
    removeWallet,
  };
};
