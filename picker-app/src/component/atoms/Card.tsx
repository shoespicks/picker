import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { $colors } from 'shared/constants/styles/colors';
import { Size, SizePx } from 'shared/types/style-props';

type Props = {
  width?: Size;
  maxWidth?: Size;
  height?: Size;
  borderWidth?: SizePx;
  className?: string;
};

export const Card: FC<PropsWithChildren<Props>> = ({
  children,
  width = '100%',
  maxWidth,
  height,
  borderWidth = '1px',
  className,
}) => (
  <div
    className={cx(
      css`
        width: ${width};
        max-width: ${maxWidth};
        height: ${height};
        background-color: ${$colors.white};
        border: ${borderWidth} solid black;
        border-radius: 8px;
      `,
      className
    )}
  >
    {children}
  </div>
);
