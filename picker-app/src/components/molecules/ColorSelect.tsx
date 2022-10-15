import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { ColorToken } from 'components/atoms/ColorToken';
import { Checkboxes } from 'components/molecules/Checkboxes';

type Props<T> = {
  value: T[];
  options: readonly T[];
  idKey?: keyof T;
  colorKey: keyof T;
  inline?: boolean;
  onChange?(value: T[]): void;
};

export function ColorSelect<T>({ value, options, idKey, colorKey, onChange }: Props<T>) {
  return (
    <Checkboxes
      value={value}
      options={options}
      idKey={idKey}
      labelKey={colorKey}
      custom={(checked: boolean, label?: string) => <ColorToken checked={checked} color={label}></ColorToken>}
      onChange={onChange}
      inline
    />
  );
}

export function ColorSelectControl<T, FormInputDef extends FieldValues>(
  props: Omit<Props<T>, 'value' | 'onChange'> & UseControllerProps<FormInputDef>
) {
  const { name, control } = props;

  const {
    field: { value, onChange },
  } = useController<FormInputDef>({ name, control });

  return <ColorSelect<T> value={value} onChange={onChange} {...props} />;
}
