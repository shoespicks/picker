import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Size } from 'shared/constants/styles/size';

type Props = {
  color?: string;
  size?: Size;
  checked?: boolean;
  className?: string;
};

export const ColorToken: FC<PropsWithChildren<Props>> = ({ color, size = '20px', checked, className }) => {
  const theme = useTheme();
  return (
    <div
      className={cx(
        css`
          width: ${size};
          height: ${size};
          background-color: ${color};
          border: 1px solid ${theme.textDisable};
          border-radius: 50%;
        `,
        {
          [css`
            outline: calc(${size} / 10) solid ${theme.focusOutline};
          `]: checked,
        }
      )}
    ></div>
  );
};
