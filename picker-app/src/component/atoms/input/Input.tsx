import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { DeepMap, FieldError, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputDefaultHeight, Size } from 'shared/constants/styles/size';

type Props = ComponentPropsWithoutRef<'input'> & {
  className?: string;
  width?: Size;
  errorMessage?: string;
};
export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, width, errorMessage, ...inputProps },
  ref
) {
  const theme = useTheme();

  return (
    <>
      <input
        ref={ref}
        type="text"
        className={cx(
          css`
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${width};
            height: ${$inputDefaultHeight};
            padding: 0 10px;
            line-height: 1;
            color: ${theme.textDefault};
            background-color: ${theme.background};
            border: 1px solid ${theme.border};
            border-radius: 2px;
          `,
          setSolidShadow(theme.border),
          className
        )}
        {...inputProps}
      ></input>
      <p>{errorMessage}</p>
    </>
  );
});

export const InputControl = <T extends FieldValues>(props: Props & UseControllerProps<T>) => {
  const { name, control } = props;
  const {
    field: { ...fieldProps },
    formState: { errors },
  } = useController<T>({ name, control });

  return (
    <Input
      {...fieldProps}
      {...props}
      errorMessage={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    />
  );
};
