import React, { Key } from 'react';
import { css, cx } from '@emotion/css';
import { RadioGroup } from '@headlessui/react';
import { getValueBykey } from 'components/utils/utils';
import { $spacing } from 'shared/constants/styles/spacing';

type Props<T> = {
  value: T;
  options: readonly T[];
  idKey?: keyof T;
  labelKey?: keyof T;
  inline?: boolean;
  className?: string;
  custom?: (checked: boolean, label?: string) => JSX.Element;
  onChange?(value: T): void;
};

export function RadioSelect<T>({ value, options, idKey, labelKey, inline, custom, className, onChange }: Props<T>) {
  return (
    <RadioGroup className={cx(styles.radios(inline), className)} value={value} onChange={onChange}>
      {options.map((o, index) => (
        <RadioGroup.Option key={idKey ? (o[idKey] as Key) : index} value={o} className={styles.option}>
          {({ active, checked }) =>
            custom ? (
              custom(checked, getValueBykey(o, labelKey))
            ) : (
              <>
                <span>{getValueBykey(o, labelKey)}</span>
              </>
            )
          }
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

const styles = {
  radios: (inline?: boolean) => css`
    display: flex;
    flex-flow: ${inline ? 'row' : 'column'} wrap;
    gap: ${$spacing.xs} ${$spacing.sm};
  `,
  option: css`
    cursor: pointer;
  `,
};
