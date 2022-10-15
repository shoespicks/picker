import React, { PropsWithChildren, type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Header } from 'features/common/header';
import { $headerHeight } from 'shared/constants/styles/size';
import Link from 'next/link';

export const TAFHeader: FC<PropsWithChildren> = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Header>
      <ul className={styles.serviceMenu}>
        <Link href="/track-and-field#1">
          <a>
            <li>検索</li>
          </a>
        </Link>
        <Link href="/track-and-field#2">
          <a>
            <li>比較</li>
          </a>
        </Link>
        <Link href="/track-and-field#3">
          <a>
            <li>チャート</li>
          </a>
        </Link>
        <Link href="/track-and-field#4">
          <a>
            <li>ユーザーランキング</li>
          </a>
        </Link>
        <Link href="/track-and-field#5">
          <a>
            <li>記事一覧</li>
          </a>
        </Link>
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
        transition: all 0.4s;
      }
    }

    li::before {
      margin-right: 12px;
      content: '＞';
    }
  `,
});
