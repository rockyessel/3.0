import { SVGComponent } from '@/interface';
// import styles from './WalletItem.module.scss';

interface Props {
  icon: SVGComponent;
  name: string;
}

const WalletItem = ({ icon: Icon, name }: Props) => {
  return (
    <span
    // className={styles.wallet}
    >
      {/* <Icon
      // className={styles.icon}
      /> */}
      {name}
    </span>
  );
};

export default WalletItem;
