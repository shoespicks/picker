import { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { MultiColumn } from 'components/layout/MultiColumn';
import { TAFSearchFormCard } from 'features/track-and-field/search/searchForm/TAFSearchFormCard';
import { TAFSearchFormModal } from 'features/track-and-field/search/searchForm/TAFSearchFormModal';
import { TAFSearchResultList } from 'features/track-and-field/search/searchResults/TAFSearchResultList';
import { hideOverBreakPointStyle, visibleOverBreakPointStyle } from 'shared/constants/styles/media-query';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { useScroll } from 'shared/hooks/useScroll';

export const TAFSearchTemplate: FC = () => {
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
        <TAFSearchFormModal />
        <Spacer size={$spacing.md}></Spacer>
      </Container>
      <Spacer size={$spacing.lg} className={visibleOverBreakPointStyle('md')}></Spacer>
      <Container as="section">
        <MultiColumn
          leftColumnElement={
            <div>
              <TAFSearchFormCard />
            </div>
          }
          breakPoint="lg"
          hideSideColumnInBreakPoint
        >
          <TAFSearchResultList />
        </MultiColumn>
      </Container>
      <Spacer size={$spacing['3xl']}></Spacer>
    </>
  );
};
