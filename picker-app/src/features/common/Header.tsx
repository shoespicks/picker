import React, { PropsWithChildren, type FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { useSession } from 'next-auth/react';
import { A } from 'components/atoms/A';
import { Container } from 'components/atoms/Container';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { HeaderNavigationLink } from 'features/common/HeaderNavigationLink';
import { LoginLauncher } from 'features/common/LoginLauncher';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { Link } from 'shared/constants/type';
import { HeaderNavigation } from './HeaderNavigation';

type Props = {
  navigationLinks: Link[];
};
export const Header: FC<PropsWithChildren<Props>> = ({ children, navigationLinks }) => {
  const { data: session } = useSession();
  const styles = getStyles(useTheme());

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <A href="/track-and-field">
            <Image src="/picker.svg" width={96} height={16} alt="picker" />
          </A>
          <HeaderNavigation
            imageUrl={session?.user?.image || undefined}
            avatarFallbackName={session?.user?.name || undefined}
          >
            <div className={styles.navigationContent}>
              <div>
                <Spacer size={$spacing.lg} />
                {navigationLinks?.length && <HeaderNavigationLink links={navigationLinks} />}
                <Spacer size={$spacing.md} />
                {!session && <LoginLauncher />}
              </div>
              <Section>{children}</Section>
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
  navigationContent: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0 ${$spacing.lg} ${$spacing.lg};
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