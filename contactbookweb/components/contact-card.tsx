import { Web3Button } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import { CONTRACT_ADDRESS } from '../const/addresses';

type Props = {
    index: number;
    name: string;
    wallet: string;
    comment: string;
};

export default function ContactCard({ index, name, wallet, comment }: Props) {
    return (
        <div className={styles.contactCardContainer}>
            <div className={styles.contactCardInfo}>
                <h2>{name}</h2>
                <p>Wallet Address:</p>
                <p>{wallet}</p>
                <p>Comment:</p>
                <p>{comment}</p>
            </div>
            <Web3Button
                className={styles.removeContactButton}
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "removeContact",
                    [
                        index
                    ]
                )}
                
            >x</Web3Button>
        </div>
    )
}