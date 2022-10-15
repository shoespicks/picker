import React from 'react';
import { ColorToken } from 'components/atoms/ColorToken';
import { RadioSelect } from 'components/molecules/RadioSelect';

type Props<T> = {
  value: T;
  options: readonly T[];
  idKey?: keyof T;
  colorKey: keyof T;
  onChange?(value: T): void;
};

export function ColorSelect<T>({ value, options, idKey, colorKey, onChange }: Props<T>) {
  return (
    <RadioSelect
      value={value}
      options={options}
      idKey={idKey}
      labelKey={colorKey}
      custom={(checked: boolean, label?: string) => (
        <ColorToken size="16px" checked={checked} color={label}></ColorToken>
      )}
      onChange={onChange}
      inline
    />
  );
}