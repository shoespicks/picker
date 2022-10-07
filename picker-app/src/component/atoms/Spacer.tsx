import React, { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Size } from 'shared/constants/styles/size';

type Props = {
  size?: Size;
  axis?: 'vertical' | 'horizontal';
};

export const Spacer: FC<PropsWithChildren<Props>> = ({ size, axis = 'vertical' }) => {
  const width = axis === 'vertical' ? '100%' : size;
  const height = axis === 'horizontal' ? '100%' : size;

  return (
    <span
      className={css`
        display: block;
        width: ${width};
        min-width: ${width};
        height: ${height};
        min-height: ${height};
      `}
    ></span>
  );
};
