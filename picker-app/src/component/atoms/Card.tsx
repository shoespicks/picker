import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  width?: Size;
  maxWidth?: Size;
  height?: Size;
  borderWidthPx?: number;
  padding?: Size;
  headerElement?: JSX.Element;
  footerElement?: JSX.Element;
  className?: string;
};

export const Card: FC<PropsWithChildren<Props>> = ({
  children,
  width = '100%',
  maxWidth,
  height,
  borderWidthPx = 1,
  padding,
  headerElement,
  footerElement,
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
          background-color: ${theme.background};
          border: ${borderWidthPx}px solid black;
          border-radius: 8px;
        `,
        className
      )}
    >
      {headerElement && (
        <div
          className={css`
            padding: ${$spacing.sm} ${$spacing.md};
            border-bottom: 1px solid ${theme.border};
          `}
        >
          {headerElement}
        </div>
      )}
      <div
        className={cx(
          css`
            width: 100%;
            height: 100%;
            padding: ${padding};
          `
        )}
      >
        {children}
      </div>
      <div
        className={css`
          padding: ${$spacing.sm} ${$spacing.md};
          border-top: 1px solid ${theme.border};
        `}
      >
        {footerElement}
      </div>
    </div>
  );
};
