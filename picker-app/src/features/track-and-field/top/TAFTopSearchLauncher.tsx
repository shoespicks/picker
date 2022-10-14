import React, { type FC, useState } from 'react';
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
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing-path';
import { $spacing } from 'shared/constants/styles/spacing';

type People = { id: number; name: string; unavailable: boolean };
const people: People[] = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

export const TAFTopSearchLauncher: FC = () => {
  const router = useRouter();
  const keywordSearch = () => {
    router.push(TAF_SEARCH_PAGE_PATH).then();
  };

  const [selectedPeople, setSelectedPeople] = useState(people[0]);

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
        <Select<People>
          value={selectedPeople}
          options={people}
          idKey="id"
          labelKey="name"
          onChange={setSelectedPeople}
        ></Select>
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
