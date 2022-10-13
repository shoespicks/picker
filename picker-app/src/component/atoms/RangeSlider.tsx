import React, { FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import * as Slider from '@radix-ui/react-slider';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { NumberRange } from 'shared/constants/input';

type Props = {
  value?: NumberRange;
  max?: number;
  step?: number;
  className?: string;
  onChange?(val: NumberRange): void;
};
export const RangeSlider: FC<Props> = ({ value = [0, 100], max = 100, step = 1, className, onChange }) => {
  const styles = getStyles(useTheme());

  return (
    <div className={className}>
      <span
        className={css`
          display: block;
          text-align: right;
        `}
      >
        {value[0]} 〜 {value[1]}
      </span>
      <Slider.Root value={value} step={step} max={max} className={styles.slider} onValueChange={onChange}>
        <Slider.Track className={styles.track}>
          <Slider.Range className={styles.range} />
        </Slider.Track>
        <>
          {value?.map((_, index) => (
            <Slider.Thumb key={index} className={styles.thumb} />
          ))}
        </>
      </Slider.Root>
    </div>
  );
};

export function RangeSliderControl<FormInputDef extends FieldValues>(
  props: Omit<Props, 'value' | 'onChange'> & UseControllerProps<FormInputDef>
) {
  const { name, control } = props;

  const {
    field: { value, onChange },
  } = useController<FormInputDef>({ name, control });

  return <RangeSlider value={value} onChange={onChange} {...props} />;
}

const getStyles = (theme: Theme) => ({
  slider: css`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    touch-action: none;
    cursor: pointer;
    user-select: none;

    &[data-orientation='horizontal'] {
      height: 16px;
    }
  `,
  track: css`
    position: relative;
    flex-grow: 1;
    background-color: ${theme.background};
    border: 1px solid ${theme.main};
    border-radius: 9999px;

    &[data-orientation='horizontal'] {
      height: 4px;
    }
  `,
  range: css`
    position: absolute;
    height: 100%;
    background-color: ${theme.main};
    border-radius: 9999px;
  `,
  thumb: css`
    display: block;
    width: 14px;
    height: 14px;
    background-color: ${theme.main};
    border-radius: 50%;
  `,
});
