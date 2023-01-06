import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { Pre } from 'components/atoms/Typography';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  type?: 'error' | 'warn' | 'info';
};

const styles = {
  error: css`
    background-color: #fff5f5;
    border-color: #cc1d1d;
  `,
  warn: css`
    background-color: #ffefe5;
    border-color: #f67113;
  `,
  info: css`
    background-color: #ecf8ff;
    border-color: #2b4483;
  `,
};
export const AlertBox: FC<PropsWithChildren<Props>> = ({ type = 'error', children }) => (
  <div
    className={cx(
      css`
        padding: ${$spacing.md};
        border-style: solid;
        border-width: 1px;
        border-radius: 2px;
      `,
      {
        [styles.error]: type === 'error',
        [styles.warn]: type === 'warn',
        [styles.info]: type === 'info',
      }
    )}
  >
    <Pre>{children}</Pre>
  </div>
);
