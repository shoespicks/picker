import { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Size } from 'shared/constants/styles/size';

type Props = {
  size?: Size;
};

export const Circle: FC<PropsWithChildren<Props>> = ({ size = '40px', children }) => {
  const theme = useTheme();

  return (
    <div
      className={css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${size};
        height: ${size};
        border: 1px solid ${theme.border};
        border-radius: 50%;
      `}
    >
      {children}
    </div>
  );
};
