import { UrlObject } from 'url';
import React, { type FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { css, cx } from '@emotion/css';
import { aStyle } from 'shared/constants/styles/typograhy';

type Props = {
  href?: string | UrlObject;
  underline?: boolean;
  className?: string;
  onClick?: () => void; // hrefと共用はできない
};
const disableStyle = css`pointer-events:none;`

export const A: FC<PropsWithChildren<Props>> = ({ children, href, underline, className, onClick }) =>
  href ? (
    <Link href={href} className={cx(aStyle(underline), className)}>
      {children}
    </Link>
  ) : (
    <span className={cx(aStyle(underline),{[disableStyle]:!onClick}, className)} onClick={onClick}>
      {children}
    </span>
  );
