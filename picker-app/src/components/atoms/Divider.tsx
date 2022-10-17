import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import * as Separator from '@radix-ui/react-separator';

type DividerColor = 'default' | 'inverse';

type Props = Separator.SeparatorProps & {
  color?: DividerColor;
};

export const Divider: FC<Props> = ({ orientation = 'horizontal', color, className, ...dividerProps }) => {
  const theme = useTheme();
  return (
    <Separator.Root
      orientation={orientation}
      className={cx(
        css`
          background-color: ${color === 'inverse' ? theme.textInverse : theme.main};

          &[data-orientation='horizontal'] {
            width: 100%;
            height: 1px;
          }

          &[data-orientation='vertical'] {
            width: 1px;
            height: 100%;
          }
        `,
        className
      )}
      {...dividerProps}
    ></Separator.Root>
  );
};
