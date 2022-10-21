import { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { IShoeSearchOrder, shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { Button } from 'components/atoms/Button';
import { Container } from 'components/atoms/Container';
import { Select } from 'components/atoms/Select';
import { Spacer } from 'components/atoms/Spacer';
import { Span, Strong } from 'components/atoms/Typography';
import { MultiColumn } from 'components/layout/MultiColumn';
import { SearchFormInput } from 'features/track-and-field/constants/search';
import { TAFSearchFormCard } from 'features/track-and-field/search/searchForm/TAFSearchFormCard';
import { TAFSearchFormModal } from 'features/track-and-field/search/searchForm/TAFSearchFormModal';
import { TAFSearchResultList } from 'features/track-and-field/search/searchResults/TAFSearchResultList';
import { SpikesQuery } from 'graphql/generated/codegen-client';
import { hideOverBreakPointStyle, visibleOverBreakPointStyle } from 'shared/constants/styles/media-query';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { useScroll } from 'shared/hooks/useScroll';

type Props = {
  data?: SpikesQuery;
  currentSearchCondition?: SearchFormInput;
  isLoading?: boolean;
  searchOrder: IShoeSearchOrder;
  setSearchOrder?: (order: IShoeSearchOrder) => void;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchTemplate: FC<Props> = ({
  data,
  currentSearchCondition,
  isLoading,
  searchOrder,
  setSearchOrder,
  onSubmit,
}) => {
  const { isScrolledTop } = useScroll();
  const theme = useTheme();

  return (
    <>
      <Container
        className={cx(
          css`
            position: sticky;
            top: calc(${$headerSize});
            z-index: 10;
            background-color: ${theme.background};
            box-shadow: ${!isScrolledTop && theme.shadowLeft};
          `,
          hideOverBreakPointStyle('md')
        )}
      >
        <Spacer size={$spacing.md}></Spacer>
        <TAFSearchFormModal currentSearchCondition={currentSearchCondition} isLoading={isLoading} onSubmit={onSubmit} />
        <Spacer size={$spacing.md}></Spacer>
      </Container>

      <Spacer size={$spacing.lg} className={visibleOverBreakPointStyle('md')}></Spacer>

      <Container as="section">
        <MultiColumn
          leftColumnElement={
            <div>
              <TAFSearchFormCard
                currentSearchCondition={currentSearchCondition}
                isLoading={isLoading}
                onSubmit={onSubmit}
              />
            </div>
          }
          hideSideColumnInBreakPoint
        >
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
                {data?.spikes?.length ?? 0}
              </Strong>
              <Span semiBold> 件</Span>
            </span>
            <Select<IShoeSearchOrder>
              value={searchOrder}
              options={Object.values(shoeSearchOrders)}
              idKey="id"
              labelKey="label"
              onChange={setSearchOrder}
              triggerContent={
                <Button
                  icon={faArrowUpWideShort}
                  label={searchOrder.label}
                  iconPosition="leftAbsolute"
                  height="40px"
                  width="180px"
                ></Button>
              }
            ></Select>
          </div>
          <Spacer size={$spacing.md}></Spacer>
          <TAFSearchResultList results={data?.spikes} isLoading={isLoading} />
        </MultiColumn>
      </Container>
      <Spacer size={$spacing['3xl']}></Spacer>
    </>
  );
};
