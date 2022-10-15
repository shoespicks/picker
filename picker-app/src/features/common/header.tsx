import React, { PropsWithChildren, type FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import Image from 'next/future/image';
import { Container } from 'components/atoms/Container';
import { $headerHeight } from 'shared/constants/styles/size';
import { HeaderNavigation } from './HeaderNavigation';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/track-and-field">
            <a>
              <Image src="/picker.svg" width={108} height={18} alt="picker" />
            </a>
          </Link>
          <HeaderNavigation>
            <div className={styles.humbergerArea}>
              {children}
              <hr />
              <button>ログイン</button>
              <button>無料会員登録</button>
              <hr />
              <label htmlFor="keyword">キーワード検索</label>
              <input type="text" id="keyword" name="keyword" />
              <hr />
              <p className={styles.serviceTitle}>PICKER</p>
              <ul className={styles.serviceType}>
                <li>陸上</li>
                <li>プロテイン</li>
                <li>テニス</li>
                <li>野球</li>
              </ul>
            </div>
          </HeaderNavigation>
        </div>
      </Container>
    </header>
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
  humbergerArea: css`
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
  serviceTitle: css`
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 700;
  `,
  serviceType: css`
    li {
      width: 100%;
      margin: 10px 0;
      font-size: 14px;
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
