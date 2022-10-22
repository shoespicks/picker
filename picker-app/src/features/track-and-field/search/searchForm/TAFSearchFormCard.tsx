import { FC, useEffect } from 'react';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/atoms/Button';
import { Card } from 'components/atoms/Card';
import { Form } from 'components/atoms/Form';
import { H4 } from 'components/atoms/Typography';
import { useSearchSpikeForm } from 'features/track-and-field/hooks/useSearchSpikeForm';
import { useSearchSpikesQueryCondition } from 'features/track-and-field/hooks/useSearchSpikesQuery';
import { FormInput } from 'features/track-and-field/search/searchForm/TAFSearchFormInput';

import { $spacing } from 'shared/constants/styles/spacing';

export const TAFSearchFormCard: FC = () => {
  const { searchCondition, setSearchCondition } = useSearchSpikesQueryCondition();
  const { formOptions, control, handleSubmit, reset } = useSearchSpikeForm(searchCondition);

  useEffect(() => {
    reset(searchCondition);
  }, [searchCondition, reset]);

  return (
    <Form onSubmit={handleSubmit(setSearchCondition)}>
      <Card
        padding={$spacing.md}
        headerElement={<H4>絞り込み</H4>}
        footerElement={
          <Button
            type="submit"
            color="primary"
            icon={faChevronCircleRight}
            label="検索する"
            width="100%"
            iconPosition="rightAbsolute"
          ></Button>
        }
      >
        <FormInput control={control} formOptions={formOptions}></FormInput>
      </Card>
    </Form>
  );
};
