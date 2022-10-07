import React, { ComponentPropsWithoutRef, type FC } from 'react';
import { css, cx } from '@emotion/css';
import { $colors, $typographyColors } from 'shared/constants/styles/colors';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputDefaultHeight } from 'shared/constants/styles/size';

type Props = ComponentPropsWithoutRef<'input'> & {
  className: string;
};
export const Input: FC<Props> = props => {
  const { className } = props;
  return (
    <input
      {...props}
      type="text"
      className={cx(
        css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: ${$inputDefaultHeight};
          padding: 0 10px;
          line-height: 1;
          color: ${$typographyColors.default};
          background-color: ${$colors.background};
          border: 1px solid ${$colors.main};
          border-radius: 2px;
          ${setSolidShadow()}
        `,
        className
      )}
    ></input>
  );
};
