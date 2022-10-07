import React, { type FC, PropsWithChildren } from 'react';
import { cx } from '@emotion/css';
import { h1Style, h2Style, h3Style } from 'shared/constants/styles/typograhy';

type TypographyProps = {
  className?: string;
};

export const H1: FC<PropsWithChildren<TypographyProps>> = ({ children, className }) => (
  <h1 className={cx(h1Style, className)}>{children}</h1>
);

export const H2: FC<PropsWithChildren<TypographyProps>> = ({ children, className }) => (
  <h2 className={cx(h2Style, className)}>{children}</h2>
);

export const H3: FC<PropsWithChildren<TypographyProps>> = ({ children, className }) => (
  <h2 className={cx(h3Style, className)}>{children}</h2>
);
