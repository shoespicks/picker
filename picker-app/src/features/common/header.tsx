import React, { PropsWithChildren, type FC } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/future/image';
import { Container } from 'components/atoms/Container';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H3 } from 'components/atoms/Typography';
import { InputButton } from 'components/molecules/InputButton';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing-path';
import { $headerHeight } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { HeaderNavigation } from './HeaderNavigation';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const keywordSearch = () => {
    router.push(TAF_SEARCH_PAGE_PATH).then();
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/track-and-field">
            <a>
              <Image src="/picker.svg" width={108} height={18} alt="picker" />
            </a>
          </Link>
          <HeaderNavigation>
            <div className={styles.hamburgerArea}>
              {children}

              <Section>
                <H3>キーワード検索</H3>
                <Spacer size={$spacing.md}></Spacer>
                <InputButton buttonColor="primary" buttonIcon={faSearch} onClick={keywordSearch}></InputButton>
              </Section>
              <hr className={styles.line} />
              <p className={styles.serviceTitle}>PICKER</p>
              <ul className={styles.serviceType}>
                <li>
                  <Link href="/track-and-field#6">
                    <a>陸上</a>
                  </Link>
                </li>
                <li>
                  <Link href="/track-and-field#7">
                    <a>プロテイン</a>
                  </Link>
                </li>
                <li>
                  <Link href="/track-and-field#8">
                    <a>テニス</a>
                  </Link>
                </li>
                <li>
                  <Link href="/track-and-field#9">
                    <a>野球</a>
                  </Link>
                </li>
              </ul>
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
    z-index: 1;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${$headerHeight};
    height: 80px;
    background-color: ${theme.main};
  `,
  headerContent: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  hamburgerArea: css`
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
  line: css`
    width: 100%;
    height: 1px;
    margin-top: 24px;
    background-color: ${theme.textInverse};
  `,
  serviceTitle: css`
    margin: 24px 0;
    font-size: 24px;
    font-weight: 700;
  `,
  serviceType: css`
    li {
      margin: 20px 0;
    }

    a {
      font-size: 14px;
      font-weight: 400;

      :hover {
        margin-left: 12px;
        transition: all 0.4s;
      }

      ::before {
        margin-right: 12px;
        content: '＞';
      }
    }
  `,
});
