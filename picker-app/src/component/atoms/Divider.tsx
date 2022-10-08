import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import * as Separator from '@radix-ui/react-separator';

export const Divider: FC<Separator.SeparatorProps> = ({ orientation = 'horizontal', className }) => {
  const theme = useTheme();
  return (
    <Separator.Root
      orientation={orientation}
      className={cx(
        className,
        css`
          background-color: ${theme.main};

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
