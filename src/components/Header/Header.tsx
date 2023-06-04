import { Menu } from '@components/Menu/Menu';
import type { FC } from 'react';

import styles from './Header.module.css';
export const Header: FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.menu}>
                <Menu />
            </div>
        </div>
    );
};
