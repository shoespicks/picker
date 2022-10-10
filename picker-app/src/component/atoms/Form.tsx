import { ComponentPropsWithoutRef, ElementType, type FC, FormEventHandler, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = ComponentPropsWithoutRef<'form'> & {
  as?: ElementType;
  className?: string;
  onSubmit?: FormEventHandler;
};

export const Form: FC<PropsWithChildren<Props>> = ({ as: CustomTag = 'form', className, onSubmit, children }) => {
  return (
    <CustomTag className={cx(styles.form, className)} onSubmit={onSubmit}>
      {children}
    </CustomTag>
  );
};

const styles = {
  form: css`
    display: block;

    [role='label'] {
      + * {
        margin-top: ${$spacing.xs};
      }
    }

    fieldset + fieldset {
      margin-top: ${$spacing.md};
    }
  `,
};
