import React, { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Size } from 'shared/types/style-props';

type Props = {
  maxWidth?: Size;
  sidePadding?: Size;
};

export const Container: FC<PropsWithChildren<Props>> = ({ children, maxWidth = '1440px', sidePadding = '16px' }) => (
  <div
    className={css`
      width: 100%;
      max-width: ${maxWidth};
      padding-right: ${sidePadding};
      padding-left: ${sidePadding};
      margin-right: auto;
      margin-left: auto;
    `}
  >
    {children}
  </div>
);
