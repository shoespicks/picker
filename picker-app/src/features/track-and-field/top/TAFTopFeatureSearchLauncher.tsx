import React, { type FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { IEventItem } from 'picker-types/types/track-and-field/shoeEvents';
import { IShoeSearchOrder } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { Button } from 'components/atoms/Button';
import { Form } from 'components/atoms/Form';
import { SelectControl } from 'components/atoms/Select';
import { Span } from 'components/atoms/Typography';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { SearchFormInputDef } from 'features/track-and-field/constants/search';

import { useSearchSpikeForm } from 'features/track-and-field/hooks/useSearchSpikeForm';
import { useSearchSpikesQueryCondition } from 'features/track-and-field/hooks/useSearchSpikesQuery';
import { $spacing } from 'shared/constants/styles/spacing';

export const TAFTopFeatureSearchLauncher: FC = () => {
  const { formOptions, control, handleSubmit } = useSearchSpikeForm();
  const { setSearchCondition } = useSearchSpikesQueryCondition();
  const router = useRouter();

  const handleSearch = handleSubmit(data => {
    setSearchCondition(data);
    router.push(TAF_SEARCH_PAGE_PATH).then();
  });

  return (
    <Form onSubmit={handleSearch} className={styles.form}>
      <div className={styles.formRow}>
        <SelectControl<IEventItem, SearchFormInputDef>
          name="events"
          control={control}
          options={formOptions.events}
          idKey="id"
          labelKey="label"
          placeholder="種目を選ぶ"
        ></SelectControl>
        <Span semiBold className={styles.formRowText}>
          で
        </Span>
      </div>
      <div className={styles.formRow}>
        <SelectControl<IShoeSearchOrder, SearchFormInputDef>
          name="order"
          control={control}
          options={formOptions.order}
          idKey="id"
          labelKey="labelAlias"
          placeholder="特徴を選ぶ"
          width="100%"
        ></SelectControl>
        <Span semiBold className={styles.formRowText}>
          スパイクを
        </Span>
      </div>
      <Button
        type="submit"
        color="primary"
        icon={faChevronCircleRight}
        label="検索する"
        width="100%"
        iconPosition="rightAbsolute"
      ></Button>
    </Form>
  );
};

const styles = {
  container: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${$spacing['3xl']};
  `,
  form: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${$spacing.md};
  `,
  formRow: css`
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: ${$spacing.lg};
  `,
  formRowText: css`
    display: inline-flex;
    align-items: center;
  `,
};
