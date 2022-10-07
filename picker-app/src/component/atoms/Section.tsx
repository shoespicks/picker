import React, { type FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const Section: FC<PropsWithChildren<Props>> = ({ children, className }) => (
  <section className={className}>{children}</section>
);
