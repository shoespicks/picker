import React, { type FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing-path';
import { TAFSearchResultCard } from 'features/track-and-field/search/searchResults/TAFSearchResultCard';
import { SpikeBase, SpikeBaseFragment } from 'graphql/generated/codegen-client';
import { $common } from 'shared/constants/styles/common';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  results?: readonly SpikeBase[];
};

export const TAFSearchResultList: FC<Props> = ({ results }) => {
  const router = useRouter();

  const handleClick = (value: SpikeBaseFragment) => {
    value?.id && router.push(`${TAF_SEARCH_PAGE_PATH}/${value.id}`).then();
  };

  return (
    <>
      {results ? (
        <ul className={styles.root}>
          {results.map((value, index) => (
            <li key={index} className={$common.truncate}>
              <TAFSearchResultCard value={value} onClick={handleClick} />
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
