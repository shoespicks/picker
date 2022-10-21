import React, { type FC } from 'react';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/atoms/Button';
import { Card } from 'components/atoms/Card';
import { Form } from 'components/atoms/Form';
import { H4 } from 'components/atoms/Typography';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';
import { useSearchSpikeForm } from 'features/track-and-field/hooks/useSearchSpikeForm';
import { FormInput } from 'features/track-and-field/search/searchForm/TAFSearchFormInput';

import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  currentSearchCondition?: SearchFormInput;
  isLoading?: boolean;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchFormCard: FC<Props> = ({
  currentSearchCondition = searchFormInputDefaultValues,
  isLoading,
  onSubmit,
}) => {
  const { formOptions, control, handleSubmit } = useSearchSpikeForm(currentSearchCondition);

  const submit = handleSubmit(data => {
    onSubmit && onSubmit(data);
  });

  return (
    <Form onSubmit={submit}>
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
            disabled={isLoading}
          ></Button>
        }
      >
        <FormInput control={control} formOptions={formOptions}></FormInput>
      </Card>
    </Form>
  );
};
