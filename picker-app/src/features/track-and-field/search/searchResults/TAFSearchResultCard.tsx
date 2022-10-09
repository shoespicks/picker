import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { Card } from 'component/atoms/Card';

type Props = {
  className?: string;
};

export const TAFSearchResultCard: FC<Props> = ({ className }) => {
  return <Card className={cx(styles.host, className)}>Itemくん</Card>;
};

const styles = {
  host: css`
    display: block;
  `,
};
