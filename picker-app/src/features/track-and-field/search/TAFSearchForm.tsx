import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IEventItem, shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { useForm } from 'react-hook-form';
import { Button } from 'component/atoms/Button';
import { Card } from 'component/atoms/Card';
import { Form } from 'component/atoms/Form';
import { InputControl } from 'component/atoms/input/Input';
import { Label } from 'component/atoms/Label';
import { SelectControl } from 'component/atoms/Select';
import { H4 } from 'component/atoms/Typography';
import { SearchFormInput } from 'features/track-and-field/search/constant';
import { $spacing } from 'shared/constants/styles/spacing';

const searchFormInputDefaultValues: SearchFormInput = {
  keyword: '',
  events: undefined,
};

type Props = {
  className?: string;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchForm: FC<Props> = ({ className, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    defaultValues: searchFormInputDefaultValues,
  });

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
            icon={faSearch}
            label="検索する"
            width="100%"
            disabled={isSubmitting}
          ></Button>
        }
        className={cx(styles.container, className)}
      >
        <fieldset>
          <Label>種目</Label>
          <SelectControl<SearchFormInput, IEventItem>
            name="events"
            control={control}
            options={Object.values(shoeEvents)}
            idKey="id"
            labelKey="label"
          ></SelectControl>
        </fieldset>

        <fieldset>
          <Label htmlFor="taf-search-form-keyword">キーワード</Label>
          <InputControl id="taf-search-form-keyword" name="keyword" width="100%" control={control} />
        </fieldset>
      </Card>
    </Form>
  );
};

const styles = {
  container: css`
    display: block;
  `,
};
