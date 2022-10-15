import React, { PropsWithChildren, type FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { SignButtons } from 'components/molecules/SignButtons';
import { Header } from 'features/common/header';
import { $headerHeight } from 'shared/constants/styles/size';

export const TAFHeader: FC<PropsWithChildren> = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Header>
      <ul className={styles.serviceMenu}>
        <li>
          <Link href="/track-and-field#1">
            <a>検索</a>
          </Link>
        </li>
        <li>
          <Link href="/track-and-field#2">
            <a>比較</a>
          </Link>
        </li>
        <li>
          <Link href="/track-and-field#3">
            <a>チャート</a>
          </Link>
        </li>
        <li>
          <Link href="/track-and-field#4">
            <a>ユーザーランキング</a>
          </Link>
        </li>
        <li>
          <Link href="/track-and-field#5">
            <a>記事一覧</a>
          </Link>
        </li>
      </ul>

      <SignButtons></SignButtons>
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
      margin: 24px 0;
    }

    a {
      font-size: 16px;
      font-weight: 400;

      :hover {
        margin-left: 12px;
        transition: all 0.4s;
      }

      ::before {
        margin-right: 12px;
        content: '＞';
      }
    }
  `,
});
