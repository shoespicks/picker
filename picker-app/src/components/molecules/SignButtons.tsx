import React, { FC } from 'react';
import { Theme, useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import Link from 'next/link';

export const SignButtons: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.buttons}>
      <Link href="/track-and-field#11">
        <a>
          <button className={styles.signButton}>ログイン</button>
        </a>
      </Link>
      <Link href="/track-and-field#12">
        <a>
          <button className={styles.signButton}>無料会員登録</button>
        </a>
      </Link>
    </div>
  );
};

const getStyles = (theme: Theme) => ({
  buttons: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 105px;
  `,
  signButton: css`
    display: flex;
    justify-content: space-between;
    width: 160px;
    padding: 15px 12px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background: #fff;
    border-radius: 2px;

    ::after {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 8px;
      font-weight: bold;
      color: #fff;
      content: '＞';
      background: #000;
      border-radius: 50%;
    }

    :hover {
      box-shadow: 5px 5px 0 #666;
    }
  `,
});
