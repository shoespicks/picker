import React, { Key } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Listbox as HeadlessSelect } from '@headlessui/react';
import { DeepMap, FieldError, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Animation } from 'component/atoms/Animation';
import { Icon } from 'component/atoms/Icon';
import { $behavior } from 'shared/constants/styles/behavior';
import { $common, setSolidShadow } from 'shared/constants/styles/common';
import { $spacing } from 'shared/constants/styles/spacing';

type Props<T> = {
  value: T;
  options: T[];
  idKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  errorMessage?: string;
  refName?: string;
  onChange?(value: T): void;
};

export function Select<T>({
  value,
  options,
  idKey,
  labelKey,
  errorMessage,
  placeholder = '選択してください',
  ...selectProps
}: Props<T>) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <HeadlessSelect value={value} {...selectProps}>
        <div className={styles.selectContainer}>
          <HeadlessSelect.Button className={styles.selectTrigger}>
            {value ? (
              <span className={styles.selectTriggerText}>{value[labelKey] as string}</span>
            ) : (
              <span className={styles.selectTriggerPlaceholder}>{placeholder}</span>
            )}
            <Icon icon={faCirclePlus} />
          </HeadlessSelect.Button>
          <Animation name="fade">
            <HeadlessSelect.Options className={styles.selectOptions}>
              {options.map(option => (
                <HeadlessSelect.Option key={option[idKey] as Key} className={styles.selectOption} value={option}>
                  {({ selected }) => (
                    <>
                      <Icon
                        icon={faCircleCheck}
                        className={css`
                          color: ${selected ? theme.main : theme.textDisable};
                          transition: color ease-in 200ms;
                        `}
                      />
                      <span className={styles.selectOptionLabel}>{option[labelKey] as string}</span>
                    </>
                  )}
                </HeadlessSelect.Option>
              ))}
            </HeadlessSelect.Options>
          </Animation>
        </div>
      </HeadlessSelect>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

const getStyles = (theme: Theme) => ({
  selectContainer: css`
    position: relative;
  `,
  selectTrigger: cx(
    $behavior.hoverSwipe(theme),
    css`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 48px;
      padding: 0 ${$spacing.md};
      cursor: pointer;
      border: 1px solid ${theme.border};
      border-radius: 2px;

      &[data-headlessui-state='open'] {
        border-radius: 2px 2px 0 0;
      }
    `,
    setSolidShadow(theme.border)
  ),
  selectTriggerText: css`
    ${$common.truncate}
  `,
  selectTriggerPlaceholder: css`
    ${$common.truncate}

    color: ${theme.textLow}
  `,
  selectOptions: cx(
    css`
      position: absolute;
      z-index: 100;
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
      background-color: ${theme.background};
      border: 1px solid ${theme.border};
      border-radius: 0 0 2px 2px;
    `,
    setSolidShadow(theme.border)
  ),
  selectOption: css`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 ${$spacing.md};
    cursor: pointer;

    & + & {
      border-top: 1px solid ${theme.lowBorder};
    }

    &:hover {
      background-color: ${theme.backgroundHover};
    }

    * + * {
      margin-left: ${$spacing.sm};
    }
  `,
  selectOptionLabel: css`
    ${$common.truncate}
  `,
});

export function SelectControl<T extends FieldValues, R>(props: Omit<Props<R>, 'value'> & UseControllerProps<T>) {
  const { name, control } = props;

  const {
    field: { ref, ...fieldProps },
    formState: { errors },
  } = useController<T>({ name, control });

  return (
    <Select
      refName={ref.name}
      {...fieldProps}
      {...props}
      errorMessage={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    />
  );
}
