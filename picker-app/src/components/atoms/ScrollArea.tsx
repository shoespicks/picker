import React, { type FC, MouseEventHandler, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  width?: Size;
  maxWidth?: Size;
  height?: Size;
  padding?: string;
  /** trueの場合スクロールが発生する場合常にスクロールバー表示。デフォルトではhover時のみ表示 */
  always?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
};

export const ScrollArea: FC<PropsWithChildren<Props>> = ({
  children,
  width = '100%',
  height,
  padding,
  always = false,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ScrollAreaPrimitive.Root
      className={css`
        width: ${width};
        max-width: ${width};
        height: ${height};
        padding: ${padding};
      `}
      type={always ? 'auto' : 'hover'}
    >
      <ScrollAreaPrimitive.Viewport className={styles.viewport}>{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="horizontal" className={styles.scrollbar}>
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

const getStyles = (theme: Theme) => ({
  viewport: css`
    width: 100%;
    height: 100%;
  `,
  scrollbar: css`
    display: flex;
    padding: 1px;
    touch-action: none;
    user-select: none;
    background: ${theme.background};
    border: 1px solid ${theme.border};
    border-radius: 8px;
    cursor: pointer;

    &[data-orientation='vertical'] {
      width: 4px;
    }

    &[data-orientation='horizontal'] {
      flex-direction: column;
      height: 4px;
    }
  `,
  thumb: css`
    position: relative;
    flex: 1;

    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      min-width: 44px;
      height: 100%;
      min-height: 44px;
      content: '';
      transform: translate(-50%, -50%);
    }

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(100% + ${$spacing.sm});
      height: calc(100% + ${$spacing.sm});
      content: '';
      background: ${theme.main};
      border-radius: 50px;
      transform: translate(-50%, -50%);
    }
  `,
});
