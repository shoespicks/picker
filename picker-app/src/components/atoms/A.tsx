import { UrlObject } from 'url';
import React, { type FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { cx } from '@emotion/css';
import { aStyle } from 'shared/constants/styles/typograhy';

type Props = {
  href?: string | UrlObject;
  underline?: boolean;
  className?: string;
  onClick?: () => void; // hrefと共用はできない
};

export const A: FC<PropsWithChildren<Props>> = ({ children, href, underline, className, onClick }) =>
  href ? (
    <Link href={href}>
      <a className={cx(aStyle(underline), className)}>{children}</a>
    </Link>
  ) : (
    <span className={cx(aStyle(underline), className)} onClick={onClick}>
      {children}
    </span>
  );
