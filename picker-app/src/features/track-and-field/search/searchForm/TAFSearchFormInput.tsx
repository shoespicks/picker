import React, { memo } from 'react';
import { css } from '@emotion/css';
import { IAthleteLevel } from 'picker-types/types/track-and-field/athleteLevel';
import { IShoeBrand } from 'picker-types/types/track-and-field/shoeBrands';
import { IShoeColor } from 'picker-types/types/track-and-field/shoeColors';
import { IShoeEnvirloment } from 'picker-types/types/track-and-field/shoeEnviroment';
import { IEventItem } from 'picker-types/types/track-and-field/shoeEvents';
import { IShoeLaceType } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { Control } from 'react-hook-form';
import { CheckboxControl } from 'components/atoms/Checkbox';
import { InputControl } from 'components/atoms/input/Input';
import { Label } from 'components/atoms/Label';
import { RangeSliderControl } from 'components/atoms/RangeSlider';
import { SelectControl } from 'components/atoms/Select';
import { Spacer } from 'components/atoms/Spacer';
import { CheckboxesControl } from 'components/molecules/Checkboxes';
import { ColorSelectControl } from 'components/molecules/ColorSelect';
import { IYears, SearchFormHasOptionKey, SearchFormInputDef } from 'features/track-and-field/constants/search';
import { $spacing } from 'shared/constants/styles/spacing';
import { FormOptions } from 'shared/hooks/useFormBase';

export const FormInput = memo(function FormInput(props: {
  control: Control<SearchFormInputDef>;
  formOptions: FormOptions<SearchFormInputDef, SearchFormHasOptionKey>;
}) {
  return (
    <>
      <Label>種目</Label>
      <SelectControl<IEventItem, SearchFormInputDef>
        name="events"
        control={props.control}
        options={props.formOptions.events}
        idKey="id"
        labelKey="label"
        placeholder="種目を選ぶ"
      ></SelectControl>

      <Label>ブランド</Label>
      <SelectControl<IShoeBrand, SearchFormInputDef>
        name="brands"
        control={props.control}
        options={props.formOptions.brands}
        idKey="id"
        labelKey="label"
        placeholder="ブランドを選ぶ"
      ></SelectControl>

      <Label>発売年</Label>
      <SelectControl<IYears, SearchFormInputDef>
        name="years"
        control={props.control}
        options={props.formOptions.years}
        idKey="id"
        labelKey="label"
        placeholder="発売年を選ぶ"
      ></SelectControl>

      <Spacer size={$spacing.sm}></Spacer>

      <CheckboxControl<SearchFormInputDef> label="最新モデルのみ" name={'latestOnly'} control={props.control} small />

      <Label htmlFor="taf-search-form-keyword">キーワード</Label>
      <InputControl<SearchFormInputDef>
        id="taf-search-form-keyword"
        name="keyword"
        width="100%"
        control={props.control}
      />

      <Label>競技レベル</Label>
      <SelectControl<IAthleteLevel, SearchFormInputDef>
        name="athleteLevel"
        control={props.control}
        options={props.formOptions.athleteLevel}
        idKey="id"
        labelKey="label"
        placeholder="競技レベルを選ぶ"
      ></SelectControl>

      <Label>対応環境</Label>
      <CheckboxesControl<IShoeEnvirloment, SearchFormInputDef>
        name="shoeEnviroments"
        control={props.control}
        options={props.formOptions.shoeEnviroments}
        idKey="id"
        labelKey="label"
      ></CheckboxesControl>

      <Label>靴紐タイプ</Label>
      <CheckboxesControl<IShoeLaceType, SearchFormInputDef>
        name="shoeLaceType"
        control={props.control}
        options={props.formOptions.shoeLaceType}
        idKey="id"
        labelKey="label"
      ></CheckboxesControl>

      <Label>価格</Label>
      <RangeSliderControl<SearchFormInputDef>
        name="priceRange"
        control={props.control}
        step={1000}
        max={50000}
        className={css`
          margin-top: -5px !important;
        `}
      />

      <Label>ピンの本数</Label>
      <RangeSliderControl<SearchFormInputDef>
        name="pinCountRange"
        control={props.control}
        max={15}
        className={css`
          margin-top: -5px !important;
        `}
      />

      <Label>カラー</Label>
      <ColorSelectControl<IShoeColor, SearchFormInputDef>
        name="shoeColor"
        control={props.control}
        options={props.formOptions.shoeColor}
        idKey="id"
        colorKey="code"
      ></ColorSelectControl>
    </>
  );
});
