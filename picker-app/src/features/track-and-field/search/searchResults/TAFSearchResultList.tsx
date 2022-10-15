import { FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { Spinner } from 'components/atoms/Spinner';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing-path';
import { TAFSearchResultCard } from 'features/track-and-field/search/searchResults/TAFSearchResultCard';
import { SpikeBase, SpikeBaseFragment } from 'graphql/generated/codegen-client';
import { $common } from 'shared/constants/styles/common';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  results?: readonly SpikeBase[];
  isLoading?: boolean;
};

export const TAFSearchResultList: FC<Props> = ({ results, isLoading }) => {
  const router = useRouter();

  const handleClick = (value: SpikeBaseFragment) => {
    value?.id && router.push(`${TAF_SEARCH_PAGE_PATH}/${value.id}`).then();
  };

  return (
    <>
      {results && !isLoading ? (
        <ul className={styles.root}>
          {results.map((value, index) => (
            <li key={index} className={$common.truncate}>
              <TAFSearchResultCard value={value} onClick={handleClick} />
            </li>
          ))}
        </ul>
      ) : (
        <Spinner />
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
