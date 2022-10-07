import React, { useState } from 'react';
import { css } from '@emotion/css';
import { faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Listbox as HeadlessSelect } from '@headlessui/react';
import { Animation } from 'component/atoms/Animation';
import { Icon } from 'component/atoms/Icon';
import { $animation } from 'shared/constants/styles/animation';
import { $colors, $typographyColors } from 'shared/constants/styles/colors';
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
                        color: ${selected ? $colors.main : $typographyColors.low};
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

const styles = {
  selectContainer: css`
    position: relative;
  `,
  selectTrigger: css`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    padding: 0 ${$spacing.md};
    cursor: pointer;
    border: 1px solid ${$colors.main};
    border-radius: 2px;

    ${setSolidShadow()}
    ${$animation.hoverSwipe}

    transition: border-radius ease-in 200ms, transform ease-in-out 200ms;

    &[data-headlessui-state='open'] {
      border-radius: 2px 2px 0 0;
    }
  `,
  selectTriggerText: css`
    ${$common.truncate}
  `,
  selectOptions: css`
    position: absolute;
    width: 100%;
    max-height: 400px;
    background-color: ${$colors.background};
    border: 1px solid ${$colors.main};
    border-radius: 0 0 2px 2px;

    ${setSolidShadow()}
  `,
  selectOption: css`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 ${$spacing.md};
    cursor: pointer;

    & + & {
      border-top: 1px solid ${$colors.lowDivider};
    }

    &:hover {
      background-color: ${$colors.backgroundHover};
    }

    * + * {
      margin-left: ${$spacing.sm};
    }
  `,
  selectOptionLabel: css`
    ${$common.truncate}
  `,
};
