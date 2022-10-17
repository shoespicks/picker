import React, { type FC, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { A } from 'components/atoms/A';
import { Card } from 'components/atoms/Card';
import { Divider } from 'components/atoms/Divider';
import { Section } from 'components/atoms/Section';
import { Select } from 'components/atoms/Select';
import { Spacer } from 'components/atoms/Spacer';
import { H3 } from 'components/atoms/Typography';
import { TAFKeywordSearchRauncher } from 'features/track-and-field/common/TAFKeywordSearchRauncher';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
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
            <A href="/" underline>
              とにかく軽い
            </A>
          </li>
          <li className={styles.link}>
            <A href="/" underline>
              とにかく軽い
            </A>
          </li>{' '}
          <li className={styles.link}>
            <A href="/" underline>
              とにかく軽い
            </A>
          </li>{' '}
        </ul>
      </Section>
      <Spacer size={$spacing['2xl']}></Spacer>
      <Section>
        <H3>フリーワードで探す: WIP</H3>
        <Spacer size={$spacing.md}></Spacer>
        <TAFKeywordSearchRauncher />
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
