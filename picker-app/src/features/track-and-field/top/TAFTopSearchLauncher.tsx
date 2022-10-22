import React, { type FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { athleteLevels } from 'picker-types/types/track-and-field/athleteLevel';
import { IEventItem, shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { A } from 'components/atoms/A';
import { Card } from 'components/atoms/Card';
import { Divider } from 'components/atoms/Divider';
import { Section } from 'components/atoms/Section';
import { Select } from 'components/atoms/Select';
import { Spacer } from 'components/atoms/Spacer';
import { H3 } from 'components/atoms/Typography';

import { TAFKeywordSearchInput, useTAFKeywordSearchInput } from 'features/track-and-field/common/TAFKeywordSearchInput';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { searchFormOptions } from 'features/track-and-field/constants/search';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';
import { $spacing } from 'shared/constants/styles/spacing';

export const TAFTopSearchLauncher: FC = () => {
  const { keywordSearch } = useTAFKeywordSearchInput();

  const router = useRouter();
  const { search, setSearchOrder } = useSearchSpike();

  const lightnessSearch = useCallback(() => {
    setSearchOrder(shoeSearchOrders.light);
    router.push(TAF_SEARCH_PAGE_PATH).then();
  }, [router, setSearchOrder]);

  const beginnerSearch = useCallback(() => {
    search({ athleteLevel: [athleteLevels.beginner] });
    router.push(TAF_SEARCH_PAGE_PATH).then();
  }, [router, search]);

  const hurdleSearch = useCallback(() => {
    search({ events: [shoeEvents.e110mH, shoeEvents.e400mH] });
    router.push(TAF_SEARCH_PAGE_PATH).then();
  }, [router, search]);

  const [event, setEvent] = useState<IEventItem>();
  const eventSearch = useCallback(
    (event: IEventItem) => {
      setEvent(event);
      search({ events: [event] });
      router.push(TAF_SEARCH_PAGE_PATH).then();
    },
    [router, search]
  );

  return (
    <Card className={styles.searchLauncher} padding={$spacing.md}>
      <Section>
        <H3>おすすめキーワード</H3>
        <Divider
          className={css`
            margin: ${$spacing.sm} 0 ${$spacing.md};
          `}
        ></Divider>
        <ul className={styles.linkContainer}>
          <li className={styles.link}>
            <A onClick={lightnessSearch} underline>
              とにかく軽い
            </A>
          </li>
          <li className={styles.link}>
            <A onClick={beginnerSearch} underline>
              初心者向け
            </A>
          </li>
          <li className={styles.link}>
            <A onClick={hurdleSearch} underline>
              ハードル競技に人気
            </A>
          </li>
        </ul>
      </Section>
      <Spacer size={$spacing['2xl']}></Spacer>
      <Section>
        <H3>フリーワードで探す</H3>
        <Spacer size={$spacing.md}></Spacer>
        <TAFKeywordSearchInput onSubmit={keywordSearch} />
      </Section>
      <Spacer size={$spacing['2xl']}></Spacer>
      <Section>
        <H3>種目から探す</H3>
        <Spacer size={$spacing.md}></Spacer>
        <Select<IEventItem>
          value={event}
          options={searchFormOptions.events}
          idKey="id"
          labelKey="label"
          onChange={eventSearch}
        ></Select>
      </Section>
      <Spacer size={$spacing.md}></Spacer>
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
