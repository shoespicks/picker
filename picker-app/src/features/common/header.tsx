import React, { PropsWithChildren, type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import Image from 'next/future/image';
import { A } from 'components/atoms/A';
import { Container } from 'components/atoms/Container';
import { Divider } from 'components/atoms/Divider';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H3, H4 } from 'components/atoms/Typography';
import { HeaderNavigationLink } from 'features/common/HeaderNavigationLink';
import { TAFKeywordSearchRauncher } from 'features/track-and-field/common/TAFKeywordSearchRauncher';
import { routing } from 'shared/constants/routing';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { HeaderNavigation } from './HeaderNavigation';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  const styles = getStyles(useTheme());

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <A href="/track-and-field">
            <Image src="/picker.svg" width={108} height={18} alt="picker" />
          </A>
          <HeaderNavigation>
            <div className={styles.hamburgerArea}>
              <Section>{children}</Section>
              <Section>
                <Section>
                  <Spacer size={$spacing.lg} />
                  <H4>キーワード検索</H4>
                  <Spacer size={$spacing.sm} />
                  <TAFKeywordSearchRauncher />
                </Section>
                <Spacer size={$spacing.lg} />
                <Divider color="inverse" />
                <H3 className={styles.serviceTitle}>PICKER</H3>
                <HeaderNavigationLink links={routing} />
              </Section>
            </div>
          </HeaderNavigation>
        </div>
      </Container>
    </header>
  );
};

const getStyles = (theme: Theme) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${$headerSize};
    background-color: ${theme.main};
  `,
  headerContent: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  hamburgerArea: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0 ${$spacing.lg};
    overflow: auto;
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
  serviceTitle: css`
    margin: 24px 0;
    font-size: 24px;
    font-weight: 700;
  `,
});
