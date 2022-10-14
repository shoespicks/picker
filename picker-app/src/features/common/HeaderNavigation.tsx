import React, { PropsWithChildren, type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Drawer } from 'component/molecules/Drawer';

export const HeaderNavigation: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Drawer
      buttonElement={
        <button type="button">
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </button>
      }
    >
      {children}
    </Drawer>
  );
};

const getStyles = (theme: Theme) => ({
  line: css`
    width: 64px;
    height: 1px;
    margin: 2px 0;
    background-color: ${theme.textInverse};
  `,
});
