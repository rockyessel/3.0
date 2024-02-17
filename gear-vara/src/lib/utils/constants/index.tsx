import PolkadotSVG from '../../../../public/assets/images/polkadot.svg';
import SubWalletSVG from '../../../../public/assets/images/subwallet.svg';
import TalismanSVG from '../../../../public/assets/images/talisman.svg';
import EnkryptSVG from '../../../../public/assets/images/enkrypt.svg';
import WalletSVG from '../../../../public/assets/images/wallet.svg';
import ExitSVG from '../../../../public/assets/images/exit.svg';
import CopySVG from '../../../../public/assets/images/copy.svg';
import { Entries } from '@/interface';

export { WalletSVG, ExitSVG, CopySVG };

const WALLET = {
  'polkadot-js': { name: 'Polkadot JS', SVG: PolkadotSVG },
  'subwallet-js': { name: 'SubWallet', SVG: SubWalletSVG },
  talisman: { name: 'Talisman', SVG: TalismanSVG },
  enkrypt: { name: 'Enkrypt', SVG: EnkryptSVG },
};

const WALLETS = Object.entries(WALLET) as Entries<typeof WALLET>;

export { WALLET, WALLETS };

export const LOCAL_STORAGE = {
  ACCOUNT: 'account',
  WALLET: 'wallet',
};
