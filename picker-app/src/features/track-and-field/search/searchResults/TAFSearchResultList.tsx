import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { TAFSearchResultCard } from 'features/track-and-field/search/searchResults/TAFSearchResultCard';
import { SpikesQuery } from 'graphql/generated/codegen-client';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  data?: SpikesQuery;
};

export const TAFSearchResultList: FC<Props> = ({ data }) => {
  const list = data?.spikes || Array.from({ length: 10 });

  return (
    <ul className={styles.root}>
      {list.map((value, index) => (
        <li key={index}>
          <TAFSearchResultCard value={value} />
        </li>
      ))}
    </ul>
  );
};

const styles = {
  root: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${$spacing.md};

    ${mediaGreaterThan('md')} {
      grid-template-columns: 1fr 1fr;
    }
  `,
};
