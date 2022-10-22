import { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { IShoeSearchOrder } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
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
  setSearchOrder?: (order: IShoeSearchOrder) => void;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchTemplate: FC<Props> = ({ data, currentSearchCondition, isLoading, setSearchOrder, onSubmit }) => {
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
          hideOverBreakPointStyle('lg')
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
          breakPoint="lg"
          hideSideColumnInBreakPoint
        >
          <TAFSearchResultList
            results={data?.spikes}
            isLoading={isLoading}
            order={currentSearchCondition?.order}
            setSearchOrder={setSearchOrder}
          />
        </MultiColumn>
      </Container>
      <Spacer size={$spacing['3xl']}></Spacer>
    </>
  );
};
