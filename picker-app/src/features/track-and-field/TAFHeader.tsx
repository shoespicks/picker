import React, { PropsWithChildren, type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Header } from 'features/common/header';
import { $headerHeight } from 'shared/constants/styles/size';

export const TAFHeader: FC<PropsWithChildren> = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Header>
      <ul className={styles.serviceMenu}>
        <li>検索</li>
        <li>比較</li>
        <li>チャート</li>
        <li>ユーザーランキング</li>
        <li>記事一覧</li>
      </ul>
    </Header>
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
  serviceMenu: css`
    margin-top: 32px;

    li {
      margin: 12px 0;
      font-size: 16px;
      font-weight: 400;

      :hover {
        margin-left: 12px;
      }
    }

    li::before {
      margin-right: 12px;
      content: '＞';
    }
  `,
});
