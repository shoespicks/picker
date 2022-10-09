import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Button } from 'component/atoms/Button';
import { Card } from 'component/atoms/Card';
import { Form } from 'component/atoms/Form';
import { InputControl } from 'component/atoms/input/Input';
import { Label } from 'component/atoms/Label';
import { H4 } from 'component/atoms/Typography';
import { $spacing } from 'shared/constants/styles/spacing';

type SearchFormInput = {
  keyword?: string;
};

const searchFormInputDefaultValues: SearchFormInput = {
  keyword: '',
};

type Props = {
  className?: string;
};

export const TAFSearchForm: FC<Props> = ({ className }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    defaultValues: searchFormInputDefaultValues,
  });

  const submit = handleSubmit(data => {
    console.log(data);
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
        <Label htmlFor="taf-search-form-keyword">キーワード</Label>
        <InputControl id="taf-search-form-keyword" name="keyword" width="100%" control={control} />
      </Card>
    </Form>
  );
};

const styles = {
  container: css`
    display: block;
  `,
};
