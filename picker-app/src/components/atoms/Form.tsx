import { ComponentPropsWithoutRef, ElementType, type FC, FormEventHandler, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = ComponentPropsWithoutRef<'form'> & {
  as?: ElementType;
  className?: string;
  onSubmit?: FormEventHandler;
};

export const Form: FC<PropsWithChildren<Props>> = ({ as: CustomTag = 'form', className, onSubmit, children }) => {
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };
  return (
    <CustomTag className={cx(styles.form, className)} onSubmit={handleSubmit}>
      {children}
    </CustomTag>
  );
};

const styles = {
  form: css`
    display: block;

    label {
      + * {
        margin-top: ${$spacing.xs};
      }
    }

    * + label {
      margin-top: ${$spacing.md};
    }
  `,
};
