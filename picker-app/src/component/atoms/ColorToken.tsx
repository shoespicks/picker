import React, { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

type Props = {
  color?: string;
  checked?: boolean;
  className?: string;
};

export const ColorToken: FC<PropsWithChildren<Props>> = ({ color, checked, className }) => {
  const theme = useTheme();
  return (
    <div
      className={css`
        width: 20px;
        height: 20px;
        background-color: ${color};
        border: 1px solid ${theme.textDisable};
        border-radius: 50%;
        outline: ${checked ? `1.5px solid ${theme.focusOutline}` : 'none'};
      `}
    ></div>
  );
};
