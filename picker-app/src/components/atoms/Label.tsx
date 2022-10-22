import React, { type FC, PropsWithChildren } from 'react';
import { cx } from '@emotion/css';
import { LabelProps } from '@radix-ui/react-label';
import * as LabelPrimitive from '@radix-ui/react-label';
import { labelStyle } from 'shared/constants/styles/typograhy';

type Props = LabelProps & {
  className?: string;
};
export const Label: FC<PropsWithChildren<Props>> = ({ htmlFor, className, children }) => {
  return (
    <LabelPrimitive.Root htmlFor={htmlFor} className={cx(labelStyle, className)}>
      {children}
    </LabelPrimitive.Root>
  );
};
