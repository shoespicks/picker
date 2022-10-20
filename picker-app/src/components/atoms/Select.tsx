import React, { Key } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Listbox } from '@headlessui/react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Animation } from 'components/atoms/Animation';
import { Button } from 'components/atoms/Button';
import { Icon } from 'components/atoms/Icon';
import { compareByKey, createValueLabel, getValueBykey, isValueExist } from 'components/utils/utils';
import { $common, setSolidShadow } from 'shared/constants/styles/common';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props<T> = {
  value: T | T[];
  options: T[];
  idKey?: keyof T;
  labelKey?: keyof T;
  placeholder?: string;
  errorMessage?: string;
  refName?: string;
  triggerContent?: JSX.Element;
  width?: Size;
  onChange?(value: T): void;
};

export function Select<T>({
  value,
  options,
  idKey,
  labelKey,
  placeholder = '選択してください',
  errorMessage,
  refName,
  triggerContent,
  width = '100%',
  ...selectProps
}: Props<T>) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div>
      <Listbox
        refName={refName}
        multiple={Array.isArray(value)}
        value={value}
        {...selectProps}
        by={compareByKey<T>(idKey)}
      >
        <div className={styles.selectContainer}>
          <Listbox.Button
            as="span"
            className={css`
              display: inline-flex;
              width: ${width};
            `}
          >
            {triggerContent ? (
              triggerContent
            ) : (
              <Button
                icon={faCirclePlus}
                label={isValueExist(value) ? createValueLabel(value, labelKey) : placeholder}
                iconPosition={'right'}
                width="100%"
                labelColor={isValueExist(value) ? 'default' : 'low'}
              ></Button>
            )}
          </Listbox.Button>
          <Animation name="fade">
            <Listbox.Options className={styles.selectOptions}>
              {options.map((option, index) => (
                <Listbox.Option
                  key={(idKey && (option[idKey] as Key)) ?? index}
                  className={styles.selectOption}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <Icon
                        icon={faCircleCheck}
                        className={css`
                          color: ${selected ? theme.main : theme.textDisable};
                          transition: color ease-in 200ms;
                        `}
                      />
                      <span className={styles.selectOptionLabel}>{getValueBykey(option, labelKey)}</span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Animation>
        </div>
      </Listbox>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
export function SelectControl<T, FormInputDef extends FieldValues>(
  props: Omit<Props<T>, 'value'> & UseControllerProps<FormInputDef>
) {
  const { name, control } = props;

  const {
    field: { ref, ...fieldProps },
    fieldState: { error },
  } = useController<FormInputDef>({ name, control });

  return <Select<T> refName={ref.name} control={control} {...fieldProps} {...props} errorMessage={error?.message} />;
}

const getStyles = (theme: Theme) => ({
  selectContainer: css`
    position: relative;
  `,
  selectOptions: cx(
    css`
      position: absolute;
      z-index: 10;
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
