import React, { type FC, useState } from 'react';
import { css, cx } from '@emotion/css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IAthleteLevel } from 'picker-types/types/track-and-field/athleteLevel';
import { IShoeBrand } from 'picker-types/types/track-and-field/shoeBrands';
import { IShoeColor } from 'picker-types/types/track-and-field/shoeColors';
import { IShoeEnvirloment } from 'picker-types/types/track-and-field/shoeEnviroment';
import { IEventItem } from 'picker-types/types/track-and-field/shoeEvents';
import { IShoeLaceType } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { Button } from 'component/atoms/Button';
import { Card } from 'component/atoms/Card';
import { CheckboxControl } from 'component/atoms/Checkbox';
import { Form } from 'component/atoms/Form';
import { InputControl } from 'component/atoms/input/Input';
import { Label } from 'component/atoms/Label';
import { RangeSliderControl } from 'component/atoms/RangeSlider';
import { SelectControl } from 'component/atoms/Select';
import { Spacer } from 'component/atoms/Spacer';
import { H4 } from 'component/atoms/Typography';
import { CheckboxesControl } from 'component/molecules/Checkboxes';
import { ColorSelectControl } from 'component/molecules/ColorSelect';
import {
  IYears,
  SearchFormInput,
  SearchFormInputDef,
  searchFormInputDefaultValues,
} from 'features/track-and-field/constants/search';
import { useSearchSpikeForm } from 'features/track-and-field/hooks/useSearchSpikeForm';

import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  className?: string;
  defaultValues?: SearchFormInput;
  isLoading?: boolean;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchForm: FC<Props> = ({
  defaultValues = searchFormInputDefaultValues,
  isLoading,
  className,
  onSubmit,
}) => {
  const { formOptions, control, handleSubmit } = useSearchSpikeForm({ defaultValues });

  const submit = handleSubmit(data => {
    onSubmit && onSubmit(data);
  });

  const [slideValue, setSlideValue] = useState<[number, number]>([0, 50000]);

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
            disabled={isLoading}
          ></Button>
        }
        className={cx(styles.container, className)}
      >
        <Label>種目</Label>
        <SelectControl<IEventItem, SearchFormInputDef>
          name="events"
          control={control}
          options={formOptions.events}
          idKey="id"
          labelKey="label"
        ></SelectControl>

        <Label>ブランド</Label>
        <SelectControl<IShoeBrand, SearchFormInputDef>
          name="brands"
          control={control}
          options={formOptions.brands}
          idKey="id"
          labelKey="label"
        ></SelectControl>

        <Label>発売年</Label>
        <SelectControl<IYears, SearchFormInputDef>
          name="years"
          control={control}
          options={formOptions.years}
          idKey="id"
          labelKey="label"
        ></SelectControl>
        <Spacer size={$spacing.sm}></Spacer>

        <CheckboxControl<SearchFormInputDef> label="最新モデルのみ" name={'latestOnly'} control={control} small />

        <Label htmlFor="taf-search-form-keyword">キーワード</Label>
        <InputControl<SearchFormInputDef> id="taf-search-form-keyword" name="keyword" width="100%" control={control} />

        <Label>競技レベル</Label>
        <SelectControl<IAthleteLevel, SearchFormInputDef>
          name="athleteLevel"
          control={control}
          options={formOptions.athleteLevel}
          idKey="id"
          labelKey="label"
        ></SelectControl>

        <Label>対応環境</Label>
        <CheckboxesControl<IShoeEnvirloment, SearchFormInputDef>
          name="shoeEnviroments"
          control={control}
          options={formOptions.shoeEnviroments}
          idKey="id"
          labelKey="label"
        ></CheckboxesControl>

        <Label>靴紐タイプ</Label>
        <CheckboxesControl<IShoeLaceType, SearchFormInputDef>
          name="shoeLaceType"
          control={control}
          options={formOptions.shoeLaceType}
          idKey="id"
          labelKey="label"
        ></CheckboxesControl>

        <Label>価格</Label>
        <RangeSliderControl<SearchFormInputDef>
          name="priceRange"
          control={control}
          step={1000}
          max={50000}
          className={css`
            margin-top: -5px !important;
          `}
        />

        <Label>ピンの本数</Label>
        <RangeSliderControl<SearchFormInputDef>
          name="pinCountRange"
          control={control}
          max={15}
          className={css`
            margin-top: -5px !important;
          `}
        />

        <Label>カラー</Label>
        <ColorSelectControl<IShoeColor, SearchFormInputDef>
          name="shoeColor"
          control={control}
          options={formOptions.shoeColor}
          idKey="id"
          colorKey="code"
        ></ColorSelectControl>
      </Card>
    </Form>
  );
};

const styles = {
  container: css`
    display: block;
  `,
};
