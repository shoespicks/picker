import React, { FC, forwardRef } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Icon } from 'components/atoms/Icon';
import { $common } from 'shared/constants/styles/common';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  value: boolean;
  label?: string;
  small?: boolean;
  custom?: (checked: boolean, label?: string) => JSX.Element;
  className?: string;
  onChange(checked: boolean): void;
};
export const Checkbox: FC<Props> = forwardRef<HTMLButtonElement, Props>(function Checkbox(
  { value, label, small, custom, className, onChange, ...checkboxProps },
  ref
) {
  const styles = getStyles(useTheme());

  return (
    <div className={cx(styles.checkboxContainer, className)}>
      <CheckboxPrimitive.Root
        ref={ref}
        checked={value}
        className={styles.checkbox}
        onCheckedChange={onChange}
        {...checkboxProps}
      >
        <>
          {custom ? (
            custom(value, label)
          ) : (
            <>
              <Icon icon={faCircleCheck} size={small ? 'sm' : 'lg'} className={styles.icon(value)} />
              <span className={cx($common.truncate, styles.label(small))}>{label}</span>
            </>
          )}
        </>
      </CheckboxPrimitive.Root>
    </div>
  );
});

export const CheckboxControl = <T extends FieldValues>(
  props: Omit<Props, 'value' | 'onChange'> & UseControllerProps<T>
) => {
  const { name, control } = props;
  const {
    field: { ...fieldProps },
  } = useController<T>({ name, control });

  return <Checkbox {...fieldProps} {...props} />;
};

const getStyles = (theme: Theme) => ({
  checkboxContainer: css`
    max-width: 100%;
    padding-left: 1px;
  `,
  checkbox: css`
    display: flex;
    align-items: center;
    max-width: 100%;
    padding-left: 1px;
    cursor: pointer;
  `,
  icon: (checked?: boolean) =>
    css`
      color: ${checked ? theme.main : theme.textDisable};
      transition: color ease-in 200ms;
    `,
  label: (small?: boolean) =>
    css`
      font-size: ${small && '14px'};

      * + & {
        margin-left: ${small ? $spacing.xs : $spacing.sm};
      }
    `,
});
