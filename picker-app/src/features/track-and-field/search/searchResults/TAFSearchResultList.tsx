import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { TAFSearchResultCard } from 'features/track-and-field/search/searchResults/TAFSearchResultCard';
import { SpikeBase } from 'graphql/generated/codegen-client';
import { $common } from 'shared/constants/styles/common';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  results?: readonly SpikeBase[];
};

export const TAFSearchResultList: FC<Props> = ({ results }) => {
  return (
    <>
      {results ? (
        <ul className={styles.root}>
          {results.map((value, index) => (
            <li key={index} className={$common.truncate}>
              <TAFSearchResultCard value={value} />
            </li>
          ))}
        </ul>
      ) : (
        <div>loading</div>
      )}
    </>
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
