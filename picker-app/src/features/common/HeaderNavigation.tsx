import React, { PropsWithChildren, type FC, useState } from 'react';
import { css } from '@emotion/css';
import { useDrawer } from 'components/hooks/useDrawer';
import { Drawer } from 'components/molecules/Drawer';
import { HumbergerButton } from 'features/common/HumbergerButton';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

export const HeaderNavigation: FC<PropsWithChildren> = ({ children }) => {
  const [humbergerOpen, setHumbergerOpen] = useState(false);

  const { isDrawerOpen, open, close, toggle } = useDrawer(
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
      triggerElement={<HumbergerButton isOpen={humbergerOpen} onClick={open}></HumbergerButton>}
    >
      <div className={styles.drawerContentContainer}>
        <div className={styles.drawerHeader}>
          <HumbergerButton isOpen={humbergerOpen} onClick={close}></HumbergerButton>
        </div>
        <div className={styles.drawerContent}>{children}</div>
      </div>
    </Drawer>
  );
};

const styles = {
  drawerContentContainer: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  drawerHeader: css`
    display: flex;
    flex: 0;
    justify-content: flex-end;
    height: ${$headerSize};
    padding: 0 ${$spacing.lg};
  `,
  drawerContent: css`
    flex: 1;
    height: 1px;
  `,
};
