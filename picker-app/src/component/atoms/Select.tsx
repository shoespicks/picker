import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Listbox as HeadlessSelect } from '@headlessui/react';
import { Animation } from 'component/atoms/Animation';
import { Icon } from 'component/atoms/Icon';
import { $behavior } from 'shared/constants/styles/behavior';
import { $common, setSolidShadow } from 'shared/constants/styles/common';
import { $spacing } from 'shared/constants/styles/spacing';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

export const Select = () => {
  const [selected, setSelected] = useState(people[0]);
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <HeadlessSelect value={selected} onChange={setSelected}>
      <div className={styles.selectContainer}>
        <HeadlessSelect.Button className={styles.selectTrigger}>
          <span className={styles.selectTriggerText}>{selected.name}</span>
          <Icon icon={faCirclePlus} />
        </HeadlessSelect.Button>
        <Animation name="fade">
          <HeadlessSelect.Options className={styles.selectOptions}>
            {people.map((person, personIdx) => (
              <HeadlessSelect.Option key={personIdx} className={styles.selectOption} value={person}>
                {({ selected }) => (
                  <>
                    <Icon
                      icon={faCircleCheck}
                      className={css`
                        color: ${theme[selected ? 'main' : 'textLow']};
                        transition: color ease-in 200ms;
                      `}
                    />
                    <span className={styles.selectOptionLabel}>{person.name}</span>
                  </>
                )}
              </HeadlessSelect.Option>
            ))}
          </HeadlessSelect.Options>
        </Animation>
      </div>
    </HeadlessSelect>
  );
};

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
  selectOptions: css`
    position: absolute;
    width: 100%;
    max-height: 400px;
    background-color: ${theme.background};
    border: 1px solid ${theme.border};
    border-radius: 0 0 2px 2px;

    ${setSolidShadow(theme.border)}
  `,
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
