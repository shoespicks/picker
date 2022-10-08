import React, { ComponentPropsWithoutRef, type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputDefaultHeight } from 'shared/constants/styles/size';

type Props = ComponentPropsWithoutRef<'input'> & {
  className: string;
};
export const Input: FC<Props> = ({ className, ...inputProps }) => {
  const theme = useTheme();

  return (
    <input
      {...inputProps}
      type="text"
      className={cx(
        css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: ${$inputDefaultHeight};
          padding: 0 10px;
          line-height: 1;
          color: ${theme.textDefault};
          background-color: ${theme.background};
          border: 1px solid ${theme.border};
          border-radius: 2px;
          ${setSolidShadow(theme.border)}
        `,
        className
      )}
    ></input>
  );
};
