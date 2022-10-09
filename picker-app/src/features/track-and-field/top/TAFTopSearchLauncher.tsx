import React, { type FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { A } from 'component/atoms/A';
import { Card } from 'component/atoms/Card';
import { Divider } from 'component/atoms/Divider';
import { Section } from 'component/atoms/Section';
import { Select } from 'component/atoms/Select';
import { Spacer } from 'component/atoms/Spacer';
import { H3 } from 'component/atoms/Typography';
import { InputButton } from 'component/molecules/InputButton';
import { TAF_SEACH_PAGE_PATH } from 'shared/constants/routing-path';
import { $spacing } from 'shared/constants/styles/spacing';

export const TAFTopSearchLauncher: FC = () => {
  const router = useRouter();
  const keywordSearch = () => {
    router.push(TAF_SEACH_PAGE_PATH).then();
  };

  return (
    <Card className={styles.searchLauncher} padding={$spacing.md}>
      <Section>
        <H3>おすすめキーワード: WIP</H3>
        <Divider
          className={css`
            margin: ${$spacing.sm} 0 ${$spacing.md};
          `}
        ></Divider>
        <ul className={styles.linkContainer}>
          <li className={styles.link}>
            <A href="/">とにかく軽い</A>
          </li>
          <li className={styles.link}>
            <A href="/">とにかく軽い</A>
          </li>{' '}
          <li className={styles.link}>
            <A href="/">とにかく軽い</A>
          </li>{' '}
        </ul>
      </Section>
      <Spacer size={$spacing['2xl']}></Spacer>
      <Section>
        <H3>フリーワードで探す: WIP</H3>
        <Spacer size={$spacing.md}></Spacer>
        <InputButton buttonColor="primary" buttonIcon={faSearch} onClick={keywordSearch}></InputButton>
      </Section>
      <Spacer size={$spacing['2xl']}></Spacer>
      <Section>
        <H3>種目から探す: WIP</H3>
        <Spacer size={$spacing.md}></Spacer>
        <Select></Select>
      </Section>
    </Card>
  );
};

const styles = {
  searchLauncher: css`
    width: 100%;
  `,
  linkContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: ${$spacing.sm} ${$spacing.md};
  `,
  link: css`
    display: inline-flex;
  `,
};
