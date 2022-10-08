import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Size } from 'shared/constants/styles/size';

type Props = {
  width?: Size;
  maxWidth?: Size;
  height?: Size;
  borderWidthPx?: number;
  paddingPx?: number;
  className?: string;
};

export const Card: FC<PropsWithChildren<Props>> = ({
  children,
  width = '100%',
  maxWidth,
  height,
  borderWidthPx = 1,
  paddingPx,
  className,
}) => {
  const theme = useTheme();
  return (
    <div
      className={cx(
        css`
          width: ${width};
          max-width: ${maxWidth};
          height: ${height};
          padding: ${paddingPx}px;
          background-color: ${theme.background};
          border: ${borderWidthPx}px solid black;
          border-radius: 8px;
        `,
        className
      )}
    >
      {children}
    </div>
  );
};
