import { ElementType, type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  as?: ElementType;
  maxWidth?: Size;
  className?: string;
};

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  as: CustomTag = 'div',
  maxWidth = '1440px',
  className,
}) => (
  <CustomTag
    className={cx(
      css`
        width: 100%;
        max-width: ${maxWidth};
        padding-right: ${$spacing.md};
        padding-left: ${$spacing.md};
        margin-right: auto;
        margin-left: auto;

        ${mediaGreaterThan('md')} {
          padding-right: ${$spacing.lg};
          padding-left: ${$spacing.lg};
        }
      `,
      className
    )}
  >
    {children}
  </CustomTag>
);
