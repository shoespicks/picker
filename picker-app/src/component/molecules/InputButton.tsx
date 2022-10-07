import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Button, ButtonColor } from 'component/atoms/Button';
import { Input } from 'component/atoms/input/Input';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputBorderRadius, $inputDefaultHeight, Size } from 'shared/constants/styles/size';

type Props = {
  buttonColor?: ButtonColor;
  buttonIcon?: IconDefinition;
  buttonLabel?: string;
  buttonWidth?: Size;
};

export const InputButton: FC<PropsWithChildren<Props>> = ({ buttonColor, buttonIcon, buttonLabel, buttonWidth }) => {
  const iconOnly = !!buttonIcon && !buttonLabel;

  return (
    <div className={styles.InputButtonContainer}>
      <Input className={styles.Input} />
      <Button
        color={buttonColor}
        icon={buttonIcon}
        label={buttonLabel}
        width={iconOnly ? $inputDefaultHeight : buttonWidth}
        className={styles.Button}
      />
    </div>
  );
};

const styles = {
  InputButtonContainer: cx(
    css`
      display: flex;
      align-items: center;
      border-radius: ${$inputBorderRadius};
    `,
    setSolidShadow()
  ),
  Input: css`
    flex: 1 1 auto;
    min-width: 1px;
    border-radius: ${$inputBorderRadius} 0 0 ${$inputBorderRadius};
    box-shadow: none;
  `,
  Button: css`
    flex: 0 0 auto;
    border-left: 0;
    border-radius: 0 ${$inputBorderRadius} ${$inputBorderRadius} 0;
  `,
};
