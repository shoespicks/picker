import { ElementType, type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { Size } from 'shared/constants/styles/size';

type Props = {
  as?: ElementType;
  maxWidth?: Size;
  sidePadding?: Size;
  className?: string;
};

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  as: CustomTag = 'div',
  maxWidth = '1440px',
  sidePadding = '16px',
  className,
}) => (
  <CustomTag
    className={cx(
      css`
        width: 100%;
        max-width: ${maxWidth};
        padding-right: ${sidePadding};
        padding-left: ${sidePadding};
        margin-right: auto;
        margin-left: auto;
      `,
      className
    )}
  >
    {children}
  </CustomTag>
);
