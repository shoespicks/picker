import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import * as Separator from '@radix-ui/react-separator';
import { $colors } from 'shared/constants/styles/colors';

export const Divider: FC<Separator.SeparatorProps> = ({ orientation = 'horizontal', className }) => {
  return (
    <Separator.Root
      orientation={orientation}
      className={cx(
        className,
        css`
          background-color: ${$colors.main};

          &[data-orientation='horizontal'] {
            width: 100%;
            height: 1px;
          }

          &[data-orientation='vertical'] {
            width: 1px;
            height: 100%;
          }
        `
      )}
    ></Separator.Root>
  );
};
