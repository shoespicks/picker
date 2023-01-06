import React, { PropsWithChildren, type FC, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { A } from 'components/atoms/A';
import { Avatar } from 'components/atoms/Avatar';
import { useDrawer } from 'components/hooks/useDrawer';
import { Drawer } from 'components/molecules/Drawer';
import { HumbergerButton } from 'features/common/HumbergerButton';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  imageUrl?: string;
  avatarFallbackName?: string;
};
export const HeaderNavigation: FC<PropsWithChildren<Props>> = ({ imageUrl, avatarFallbackName, children }) => {
  const [humbergerOpen, setHumbergerOpen] = useState(false);

  const { isDrawerOpen, close, toggle } = useDrawer(
    () =>
      setTimeout(() => {
        setHumbergerOpen(true);
      }, 50),
    () => setHumbergerOpen(false)
  );

  return (
    <Drawer
      isOpen={isDrawerOpen}
      isOpenChange={toggle}
      triggerElement={
        <div className={styles.triggerContainer}>
          {(imageUrl || avatarFallbackName) && <Avatar imageUrl={imageUrl} fallbackName={avatarFallbackName} />}
          <HumbergerButton isOpen={humbergerOpen}></HumbergerButton>
        </div>
      }
    >
      <div className={styles.drawerContentContainer}>
        <div className={styles.drawerHeader}>
          <A href="/track-and-field">
            <Image src="/picker.svg" width={96} height={16} alt="picker" />
          </A>
          <div className={styles.triggerContainer} onClick={close}>
            {(imageUrl || avatarFallbackName) && <Avatar imageUrl={imageUrl} fallbackName={avatarFallbackName} />}
            <HumbergerButton isOpen={humbergerOpen}></HumbergerButton>
          </div>
        </div>
        <div className={styles.drawerContent}>{children}</div>
      </div>
    </Drawer>
  );
};

const styles = {
  triggerContainer: css`
    display: flex;
    gap: ${$spacing.lg};
    align-items: center;
    cursor: pointer;
  `,
  drawerContentContainer: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  drawerHeader: css`
    display: flex;
    flex: 0;
    align-items: center;
    justify-content: space-between;
    height: ${$headerSize};
    padding: 0 ${$spacing.lg};
  `,
  drawerContent: css`
    flex: 1;
    height: 1px;
  `,
};
