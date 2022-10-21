import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { A } from 'components/atoms/A';
import { Icon } from 'components/atoms/Icon';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H4 } from 'components/atoms/Typography';
import { SignButtons } from 'components/molecules/SignButtons';
import { Header } from 'features/common/header';
import { TAFKeywordSearchInput, useTAFKeywordSearchInput } from 'features/track-and-field/common/TAFKeywordSearchInput';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { routing } from '../constants/routing';

export const TAFHeader: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { keywordSearch } = useTAFKeywordSearchInput();
  return (
    <Header>
      <ul className={styles.links}>
        {routing.map(l => (
          <li key={l.label}>
            <A href={l.href}>
              <Icon icon={faChevronRight}></Icon>
              <span>{l.label}</span>
            </A>
          </li>
        ))}
      </ul>
      <SignButtons></SignButtons>
      <Section>
        <Spacer size={$spacing.lg} />
        <H4>キーワード検索</H4>
        <Spacer size={$spacing.sm} />
        <TAFKeywordSearchInput onSubmit={keywordSearch} />
      </Section>
      <Spacer size={$spacing.lg} />
    </Header>
  );
};

const getStyles = (theme: Theme) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${$headerSize};
    background-color: ${theme.main};
  `,
  links: css`
    margin: ${$spacing.lg} 0 ${$spacing.lg} -${$spacing.md};

    a {
      display: flex;
      align-items: center;
      padding: ${$spacing.sm} ${$spacing.md};
      font-size: 14px;
      font-weight: 400;
      border-radius: 2px;
      transition: margin-left ease-in 200ms, background-color ease-in 200ms;

      > * + * {
        margin-left: ${$spacing.md};
      }

      :hover {
        margin-left: ${$spacing.md};
        background-color: ${theme.inverseOverlayHover};
        transition: all 0.4s;
      }
    }
  `,
});
