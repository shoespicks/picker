import React, { type FC, MouseEventHandler, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { $behavior } from 'shared/constants/styles/behavior';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  width?: Size;
  maxWidth?: Size;
  height?: Size;
  borderWidthPx?: number;
  padding?: Size;
  clickable?: boolean;
  headerElement?: JSX.Element;
  footerElement?: JSX.Element;
  className?: string;
  onClick?: MouseEventHandler;
};

export const Card: FC<PropsWithChildren<Props>> = ({
  children,
  width = '100%',
  maxWidth,
  height,
  borderWidthPx = 1,
  padding,
  clickable,
  headerElement,
  footerElement,
  className,
  onClick,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div
      className={cx(
        styles.cardConteiner(width, maxWidth, height, borderWidthPx),
        clickable && styles.hostClickable,
        className
      )}
      onClick={onClick}
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
      {footerElement && (
        <div
          className={css`
            padding: ${$spacing.sm} ${$spacing.md};
            border-top: 1px solid ${theme.border};
          `}
        >
          {footerElement}
        </div>
      )}
    </div>
  );
};

const getStyles = (theme: Theme) => ({
  cardConteiner: (width?: Size, maxWidth?: Size, height?: Size, borderWidthPx?: number) => css`
    width: ${width};
    max-width: ${maxWidth};
    height: ${height};
    background-color: ${theme.background};
    border: ${borderWidthPx}px solid black;
    border-radius: 8px;
  `,
  hostClickable: cx(
    css`
      cursor: pointer;
    `,
    $behavior.overlayHover(theme)
  ),
});
