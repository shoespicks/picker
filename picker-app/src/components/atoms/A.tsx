import { UrlObject } from 'url';
import React, { type FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { cx } from '@emotion/css';
import { aStyle } from 'shared/constants/styles/typograhy';

type TypographyProps = {
  href: string | UrlObject;
  className?: string;
};

export const A: FC<PropsWithChildren<TypographyProps>> = ({ children, href, className }) => (
  <Link href={href}>
    <a className={cx(aStyle, className)}>{children}</a>
  </Link>
);
