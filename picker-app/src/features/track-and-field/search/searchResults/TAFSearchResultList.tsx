import { FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { IShoeSearchOrder, shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { Button } from 'components/atoms/Button';
import { Select } from 'components/atoms/Select';
import { Spacer } from 'components/atoms/Spacer';
import { Spinner } from 'components/atoms/Spinner';
import { Span, Strong } from 'components/atoms/Typography';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { TAFSearchResultCard } from 'features/track-and-field/search/searchResults/TAFSearchResultCard';
import { SpikeBase, SpikeBaseFragment } from 'graphql/generated/codegen-client';
import { $common } from 'shared/constants/styles/common';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  results?: readonly SpikeBase[];
  order?: IShoeSearchOrder;
  isLoading?: boolean;
  setSearchOrder?(order?: IShoeSearchOrder): void;
};

export const TAFSearchResultList: FC<Props> = ({ results, order, isLoading, setSearchOrder }) => {
  const router = useRouter();

  const handleClick = (value: SpikeBaseFragment) => {
    value?.id && router.push(`${TAF_SEARCH_PAGE_PATH}/${value.id}`).then();
  };

  return (
    <>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <span
          className={css`
            margin-top: ${$spacing.xs};
          `}
        >
          <Strong fontSize="24px" loud>
            {results?.length ?? 0}
          </Strong>
          <Span semiBold> 件</Span>
        </span>
        <Select<IShoeSearchOrder>
          value={order}
          options={Object.values(shoeSearchOrders)}
          idKey="id"
          labelKey="label"
          onChange={setSearchOrder}
          triggerContent={
            <Button
              icon={faArrowUpWideShort}
              label={order?.label}
              iconPosition="leftAbsolute"
              height="40px"
              width="180px"
            ></Button>
          }
        ></Select>
      </div>
      <Spacer size={$spacing.md}></Spacer>
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
