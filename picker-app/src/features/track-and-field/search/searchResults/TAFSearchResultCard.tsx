import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { Card } from 'component/atoms/Card';
import { SpikeFragment } from 'graphql/generated/codegen-client';

type Props = {
  value?: SpikeFragment;
  className?: string;
};

export const TAFSearchResultCard: FC<Props> = ({ value, className }) => {
  return (
    <>
      {value ? (
        <Card className={cx(styles.host, className)}>
          <p>{value.id}</p>
          <p>{value.name}</p>
        </Card>
      ) : (
        <Card className={cx(styles.host, className)}>
          <p>loading...</p>
        </Card>
      )}
    </>
  );
};

const styles = {
  host: css`
    display: block;
  `,
};
