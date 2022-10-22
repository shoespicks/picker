import React, { MouseEvent, MouseEventHandler } from 'react';
import { ColorToken } from 'components/atoms/ColorToken';
import { RadioSelect } from 'components/molecules/RadioSelect';

type Props<T> = {
  value: T;
  options: readonly T[];
  idKey?: keyof T;
  colorKey: keyof T;
  large?: boolean;
  onChange?(value: T): void;
};

export function ColorRadio<T>({ value, options, idKey, colorKey, large, onChange }: Props<T>) {
  const onOptionClickHandler: MouseEventHandler = function a(e: MouseEvent) {
    e.stopPropagation();
  };

  return (
    <RadioSelect
      value={value}
      options={options}
      idKey={idKey}
      labelKey={colorKey}
      custom={(checked: boolean, label?: string) => (
        <ColorToken size={large ? '24px' : '16px'} checked={checked} color={label}></ColorToken>
      )}
      onChange={onChange}
      onOptionClick={onOptionClickHandler}
      inline
    />
  );
}
