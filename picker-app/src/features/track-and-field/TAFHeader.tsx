import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Header } from 'features/common/header';
import { $headerHeight } from 'shared/constants/styles/size';

export const TAFHeader: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return <Header />;
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
});
