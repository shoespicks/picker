import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { BreakpointCode, mediaGreaterThan } from 'shared/constants/styles/media-query';
import { Size } from 'shared/constants/styles/size';

type Props = {
  size?: Size;
  axis?: 'vertical' | 'horizontal';
  breackPoint?: BreakpointCode;
  overbreackPointSize?: Size;
  className?: string;
};

export const Spacer: FC<PropsWithChildren<Props>> = ({
  size,
  axis = 'vertical',
  breackPoint,
  overbreackPointSize,
  className,
}) => {
  const width = axis === 'vertical' ? '100%' : size;
  const height = axis === 'horizontal' ? '100%' : size;
  const overBreakPointWidth = axis === 'vertical' ? '100%' : overbreackPointSize;
  const overBreakPointHeight = axis === 'horizontal' ? '100%' : overbreackPointSize;

  return (
    <span
      className={cx(
        css`
          display: block;
          width: ${width};
          min-width: ${width};
          height: ${height};
          min-height: ${height};

          ${breackPoint && mediaGreaterThan(breackPoint)} {
            width: ${overBreakPointWidth};
            min-width: ${overBreakPointWidth};
            height: ${overBreakPointHeight};
            min-height: ${overBreakPointHeight};
          }
        `,
        className
      )}
    ></span>
  );
};
