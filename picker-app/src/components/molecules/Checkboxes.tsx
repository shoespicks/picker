import React, { Key } from 'react';
import { css } from '@emotion/css';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Checkbox } from 'components/atoms/Checkbox';
import { compareByKey, getValueBykey, selectedByKey } from 'components/utils/utils';
import { $spacing } from 'shared/constants/styles/spacing';

type Props<T> = {
  value: T[];
  options: readonly T[];
  idKey?: keyof T;
  labelKey?: keyof T;
  inline?: boolean;
  custom?: (checked: boolean, label?: string) => JSX.Element;
  onChange?(value: T[]): void;
};

export function Checkboxes<T>({ value, options, idKey, labelKey, inline, custom, onChange }: Props<T>) {
  const onItemChage = (option: T) => (checked: boolean) => {
    if (!onChange) {
      return;
    }

    const newValue = value.filter(v => !compareByKey(idKey)(v, option));
    checked && newValue.push(option);
    onChange(newValue);
  };

  return (
    <ul className={styles.checkboxes(inline)}>
      {options.map((o, index) => (
        <li key={(idKey && (o[idKey] as Key)) ?? index}>
          <Checkbox
            value={selectedByKey(o, value, idKey)}
            label={getValueBykey(o, labelKey)}
            custom={custom}
            onChange={onItemChage(o)}
          />
        </li>
      ))}
    </ul>
  );
}

export function CheckboxesControl<T, FormInputDef extends FieldValues>(
  props: Omit<Props<T>, 'value' | 'onChange'> & UseControllerProps<FormInputDef>
) {
  const { name, control } = props;

  const {
    field: { value, onChange },
  } = useController<FormInputDef>({ name, control });

  return <Checkboxes<T> value={value} onChange={onChange} {...props} />;
}

const styles = {
  checkboxes: (inline?: boolean) => css`
    display: flex;
    flex-flow: ${inline ? 'row' : 'column'} wrap;
    gap: ${$spacing.xs} ${$spacing.sm};

    > li {
      max-width: 100%;
    }
  `,
};
