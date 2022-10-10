import React, { PropsWithChildren, type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Drawer } from 'component/molecules/Drawer';
import { $headerHeight } from 'shared/constants/styles/size';

export const HeaderNavigation: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Drawer
      buttonElement={
        <button type="button" className={styles.drawerTrigger}>
          Open dialog
        </button>
      }
    >
      {children}
    </Drawer>
  );
};

const getStyles = (theme: Theme) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${$headerHeight};
    background-color: ${theme.main};
  `,
  headerContent: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  drawerTrigger: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
});
